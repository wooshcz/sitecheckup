import * as db from "$lib/database";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const remote_ip = event.getClientAddress() ?? "n/a";
    const user = event.locals.user;

    const resp = await db.postJob(
      data.get("type"),
      data.get("url"),
      remote_ip,
      user?.email,
    );
    return resp;
  },
};
