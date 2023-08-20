import * as db from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url }) {
  const items = await db.getJobs();

  return {
    items: items,
    title: 'Results'
  };
}