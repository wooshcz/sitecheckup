import pg from "pg";
import bcrypt from "bcrypt";
const { Client } = pg;

const config = {
    user: import.meta.env.VITE_PGUSER,
    host: import.meta.env.VITE_PGHOST,
    database: import.meta.env.VITE_PGDATABASE,
    password: import.meta.env.VITE_PGPASSWORD,
    port: import.meta.env.VITE_PGPORT,
};

const client = new Client(config);
client.connect((err) => {
    if (err) {
        console.error(`${Date().toString()}: Error connecting to DB: ${err}`);
    } else {
        console.log(`${Date().toString()}: Connected to DB`);
    }
});

export async function getJobs(user_email) {
    const limit = 50;
    const offset = 0;
    if (user_email) {
        const queryResponse = await client.query(
            "SELECT job_id, status, created, type, url FROM public.jobs" +
                " WHERE user_email=$1" +
                " ORDER BY created desc limit $2 offset $3",
            [user_email, limit, offset],
        );
        return queryResponse.rows;
    } else {
        const queryResponse = await client.query(
            "SELECT job_id, status, created, type, url FROM public.jobs" +
                " WHERE user_email IS NULL" +
                " ORDER BY created desc limit $1 offset $2",
            [limit, offset],
        );
        return queryResponse.rows;
    }
}

export async function getJob(job_id) {
    const queryResponse = await client.query(
        "SELECT * FROM public.jobs WHERE job_id::varchar=$1",
        [job_id],
    );
    return queryResponse.rows[0];
}

export async function postJob(type, url, remote_ip, user_email) {
    if (await rateLimitExceeded(remote_ip, user_email)) {
        return { success: false, errors: ["Your daily quota of jobs was exceeded!"] };
    }
    console.log(`${Date().toString()}: Creating new ${type} job for ${url}`);
    const queryResponse = await client.query(
        "INSERT INTO public.jobs (job_id, status, created, type, url, remote_ip, user_email)" +
            " VALUES (gen_random_uuid(), 'CREATED', now(), $1, $2, $3, $4) RETURNING job_id",
        [type, url, remote_ip, user_email],
    );
    return { success: true, jobId: queryResponse.rows[0].job_id };
}

export async function attemptLogin(email, password) {
    const queryResponse = await client.query(
        "SELECT * FROM public.users WHERE email=$1",
        [email],
    );
    if (queryResponse.rows.length !== 1) {
        return { errors: ["Username and password does not match"] };
    }
    const match = await bcrypt.compare(password, queryResponse.rows[0].hash);
    if (match) {
        await client.query(
            "UPDATE public.users SET last_logged_in=now() WHERE email=$1",
            [email],
        );
        return {
            "name": queryResponse.rows[0].name,
            "email": queryResponse.rows[0].email,
        };
    } else {
        return { errors: ["Username and password does not match"] };
    }
}

export async function rateLimitExceeded(remote_ip, user_email) {
    const limit = user_email ? 20 : 3;
    const queryResponse = await client.query(
        "SELECT job_id FROM public.jobs WHERE remote_ip=$1 AND created > now() - interval '1 day'",
        [remote_ip],
    );
    return queryResponse.rows.length > limit;
}

export async function registerUser(data) {
    if (
        await client.query("SELECT * FROM public.users WHERE email=$1", [
            data.email,
        ]).rows.length > 0
    ) {
        return { errors: ["User with this email already exists"] };
    }
    if (
        await client.query("SELECT * FROM public.users WHERE name=$1", [
            data.name,
        ]).rows.length > 0
    ) {
        return { errors: ["User with this name already exists"] };
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(data.password, saltRounds);
    if (hash) {
        await client.query(
            "INSERT INTO public.users (email, name, hash, created) VALUES ($1, $2, $3, now())",
            [data.email, data.name, hash],
        );
        return { email: data.email, name: data.name };
    } else {
        return { errors: ["Failure during user creation"] };
    }
}

export async function getProfile(profile_name) {
    const queryResponse = await client.query(
        "SELECT u.*,count(j.job_id) AS count_of_jobs FROM public.users u" +
            " LEFT JOIN public.jobs j ON (u.email = j.user_email)" +
            " WHERE u.name::varchar=$1" +
            " GROUP BY u.email",
        [profile_name],
    );
    if (queryResponse.rows.length == 1) {
        return queryResponse.rows[0];
    } else {
        return { errors: ["Error fetching profile!"] };
    }
}
