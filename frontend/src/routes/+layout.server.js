/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    return {
        application: 'SiteTest3 Application',
        title: 'Home',
        user: locals.user && {
            name: locals.user.name,
            email: locals.user.email
        }
    };
}