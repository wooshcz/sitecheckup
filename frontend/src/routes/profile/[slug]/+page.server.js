import * as db from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url, params }) {
  const item = await db.getProfile(params.slug);

  return {
    item: item,
    title: 'Profile ' + item.name
  };
}