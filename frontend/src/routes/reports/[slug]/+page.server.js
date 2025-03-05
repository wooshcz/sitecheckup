import * as db from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url, params }) {
  const item = await db.getJob(params.slug);

  return {
    item: item,
    title: 'Job ' + item.job_id
  };
}