import * as db from "$lib/database";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    // console.log(data)
    const remote_ip = event.getClientAddress() ?? "n/a";
    const jwt = event.cookies.get('jwt');
    const user = jwt ? JSON.parse(Buffer.from(jwt, 'base64').toString('utf8')) : null;

    const jobId = await db.postJob(
      data.get("type"),
      data.get("url"),
      remote_ip,
      user?.email
    );
    return { success: true, job_id: jobId };
  },
};
