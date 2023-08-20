import pg from 'pg'
import { readFileSync } from 'fs';
import bcrypt from "bcrypt";
const { Client } = pg;

const config = {
    user: import.meta.env.VITE_PGUSER,
    host: import.meta.env.VITE_PGHOST,
    database: import.meta.env.VITE_PGDATABASE,
    password: import.meta.env.VITE_PGPASSWORD,
    port: import.meta.env.VITE_PGPORT,
    ssl: {
        rejectUnauthorized: false,
        ca: readFileSync('./k8s-db-ca-certificate.crt').toString(),
    },
}

const client = new Client(config);
client.connect(err => {
    if (err) {
        console.error(`${Date().toString()}: Error connecting to DB: ${err}`)
    } else {
        console.log(`${Date().toString()}: Connected to DB`)
    }
});

export async function getJobs() {
    const limit = 50
    const offset = 0
    const queryResponse = await client.query("SELECT job_id, status, created, type, url FROM public.jobs order by created desc limit $1 offset $2", [limit, offset])
    return queryResponse.rows
}

export async function getJob(job_id) {
    const queryResponse = await client.query("SELECT * FROM public.jobs WHERE job_id::varchar=$1", [job_id])
    return queryResponse.rows[0]
}

export async function postJob(type, url) {
    console.log(`${Date().toString()}: Creating new ${type} job for ${url}`);
    const queryResponse = await client.query("INSERT INTO public.jobs (job_id, status, created, type, url) VALUES (gen_random_uuid(), 'CREATED', CURRENT_TIMESTAMP, $1, $2) RETURNING job_id", [type, url])
    return queryResponse.rows[0].job_id
}

export async function attemptLogin(email, password) {
    const queryResponse = await client.query("SELECT * FROM public.users WHERE email=$1", [email])
    if (queryResponse.rows.length !== 1) {
        return { errors: ['Username and password does not match'] }
    }
    const match = await bcrypt.compare(password, queryResponse.rows[0].hash)
    if (match) {
        return { 'name': queryResponse.rows[0].name, 'email': queryResponse.rows[0].email }
    } else {
        return { errors: ['Username and password does not match'] }
    }
}

export async function registerUser(data) {
    const queryResponse = await client.query("SELECT * FROM public.users WHERE email=$1", [data.email])
    if (queryResponse.rows.length > 0) {
        return { errors: ['User with this email already exists'] }
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(data.password, saltRounds)
    if (hash) {
        const response = await client.query("INSERT INTO public.users (email, name, hash) VALUES ($1, $2, $3)", [data.email, data.name, hash])
        return { email: data.email, name: data.name }
    } else {
        return { errors: ['Failure during user creation'] }
    }
}