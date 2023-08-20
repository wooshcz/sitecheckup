import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, locals }) {
    if (!locals.user) {
        throw redirect(307, '/');
    } else {
        cookies.delete('jwt')
        locals.user = undefined
    }
}
