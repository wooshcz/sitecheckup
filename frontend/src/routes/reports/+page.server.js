import * as db from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const user = locals.user;
  const items = await db.getJobs(user?.email);

  return {
    items: items,
    title: 'Reports'
  };
}