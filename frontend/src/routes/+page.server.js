import * as db from '$lib/database';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData()
    // console.log(data)
    const jobId = await db.postJob(data.get('type'), data.get('url'))
    return { success: true, job_id: jobId };
  }
};
