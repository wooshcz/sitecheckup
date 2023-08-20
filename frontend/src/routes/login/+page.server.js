import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if (locals.user) throw redirect(307, '/');
    return {
        title: 'Login'
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const body = await db.attemptLogin(data.get('email'), data.get('password'));

        if (body.errors) {
            return fail(401, body);
        }
        console.log(JSON.stringify(body))
        const value = Buffer.from(JSON.stringify(body)).toString('base64')
        cookies.set('jwt', value, { path: '/' })

        throw redirect(307, '/');
    }
};