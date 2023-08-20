/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    return {
        application: 'SiteCheckup Application',
        title: 'Home',
        user: locals.user && {
            name: locals.user.name,
            email: locals.user.email
        }
    };
}