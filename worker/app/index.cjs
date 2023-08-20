
const lighthouse = require('lighthouse/core/index.cjs')
const chromeLauncher = require('chrome-launcher');
const { readFileSync, rm } = require('fs');
const { URL } = require('url');
const { Client } = require('pg')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { XMLParser } = require("fast-xml-parser");

const db_config = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false,
        ca: readFileSync('./k8s-db-ca-certificate.crt').toString(),
    },
}

const lighthouse_opts = {
    chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-dev-shm-usage'
    ],
    logLevel: 'info',
    output: 'json'
};


const testssl_opts = [
    '--hints',
    '--quiet',
    '--severity LOW',
    '--parallel'
];

const linkchecker_opts = [
    '--no-robots',
    '--check-extern',
    '--recursion-level=1',
    '--output=xml/utf8',
    '--verbose'
];

const db_client = new Client(db_config);
db_client.connect(err => {
    if (err) {
        console.error(`${Date().toString()}: Error connecting to DB: ${err}`)
        process.exit(1);
    } else {
        console.log(`${Date().toString()}: Connected to DB`)
    }
});

function run_lighthouse(url, job_id, opts, config = null) {
    db_client.query("UPDATE public.jobs SET status='STARTED' WHERE job_id=$1;", [job_id]);
    console.log(`${Date().toString()}: Job ${job_id} started`);
    chromeLauncher
        .launch({ chromeFlags: opts.chromeFlags })
        .then(chrome => {
            opts.port = chrome.port;
            lighthouse(url, opts, config).then(results => {
                chrome.kill()
                db_client.query("UPDATE public.jobs SET status='FINISHED', results=$1 WHERE job_id=$2;", [results.lhr, job_id]);
                console.log(`${Date().toString()}: Job ${job_id} finished for ${url}`);
                job_running = false
            });
        });
}

function run_testssl(hostname, job_id, opts) {
    db_client.query("UPDATE public.jobs SET status='STARTED' WHERE job_id=$1;", [job_id]);
    console.log(`${Date().toString()}: Job ${job_id} started`);
    const testSslCommand = './testssl.sh --logfile ' + job_id + '.log --jsonfile ' + job_id + '.json ' + opts.join(' ') + ' ' + hostname;
    //console.log(testSslCommand);
    exec(testSslCommand + ' || true').then(() => {
        const jsonOutput = readFileSync(job_id + '.json', 'utf8');
        rm(job_id + '.json', () => { });
        rm(job_id + '.log', () => { });
        db_client.query("UPDATE public.jobs SET status='FINISHED', results=$1 WHERE job_id=$2;", [jsonOutput, job_id]);
        console.log(`${Date().toString()}: Job ${job_id} finished for ${hostname}`);
        job_running = false
    });
}

function run_linkchecker(url, job_id, opts) {
    db_client.query("UPDATE public.jobs SET status='STARTED' WHERE job_id=$1;", [job_id]);
    console.log(`${Date().toString()}: Job ${job_id} started`);
    const linkCheckerCommand = 'linkchecker ' + opts.join(' ') + ' ' + url;
    //console.log(linkCheckerCommand);
    exec(linkCheckerCommand + ' || true').then(output => {
        console.log(output.stdout)
        const parser = new XMLParser();
        const xml_parsed = parser.parse(output.stdout);
        db_client.query("UPDATE public.jobs SET status='FINISHED', results=$1 WHERE job_id=$2;", [JSON.stringify(xml_parsed.linkchecker), job_id]);
        console.log(`${Date().toString()}: Job ${job_id} finished for ${url}`);
        job_running = false
    })
}

function worker_job(params) {
    if (params.url != null && params.type != null) {
        try {
            const myURL = new URL(params.url);
            try {
                if (params.type === 'lighthouse') {
                    console.log(`${Date().toString()}: Executing lighthouse against ${params.url}`);
                    job_running = true
                    run_lighthouse(params.url, params.job_id, lighthouse_opts);
                } else if (params.type === 'testssl') {
                    console.log(`${Date().toString()}: Executing testssl against ${myURL.host}`);
                    job_running = true
                    run_testssl(myURL.host, params.job_id, testssl_opts);
                } else if (params.type === 'linkchecker') {
                    console.log(`${Date().toString()}: Executing linkchecker against ${params.url}`);
                    job_running = true
                    run_linkchecker(params.url, params.job_id, linkchecker_opts)
                } else {
                    db_client.query("UPDATE public.jobs SET status='NOT_SUPPORTED' WHERE job_id=$1;", [params.job_id]);
                    console.log(`${Date().toString()}: Job ${params.job_id} has unsupported type`);
                }
            } catch (error) {
                db_client.query("UPDATE public.jobs SET status='ERROR' WHERE job_id=$1;", [params.job_id]);
                console.log(`${Date().toString()}: Server error: ${error}`);
                job_running = false
            }
        } catch (error) {
            db_client.query("UPDATE public.jobs SET status='ERROR' WHERE job_id=$1;", [params.job_id])
            console.log(`${Date().toString()}: ${error.input} is not a valid url`)
            job_running = false
        }
    }
}


// main worker loop
async function main() {
    while (true) {
        if (job_running === false) {
            const queryResponse = await db_client.query("SELECT * FROM public.jobs WHERE status='CREATED' ORDER BY created ASC;")
            // console.log(`${Date().toString()}: There is ${queryResponse.rows.length} jobs in queue`)
            if (queryResponse.rows.length > 0) {
                worker_job(queryResponse.rows[0])
            }
        }
        await new Promise(r => setTimeout(r, 10000))
    }
}

job_running = false
main()