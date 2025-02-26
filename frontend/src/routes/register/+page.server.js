import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
    const { user } = await parent();
    if (user) redirect(307, '/');
    return {
        title: 'Register'
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const body = await db.registerUser({
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password')
        });

        console.log(body)

        if (body.errors) {
            return fail(401, body);
        }

        const value = Buffer.from(JSON.stringify(body)).toString('base64')
        cookies.set('jwt', value, { path: '/' });

        redirect(307, '/');
    }
};