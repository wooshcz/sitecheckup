/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
    const jwt = event.cookies.get('jwt');

    console.log({
        'event': `${event.url.protocol}//${event.url.host}${event.url.pathname}`,
        'remote ip': `${event.getClientAddress()}`,
        'trusted origin from headers': `${event.request.headers.get('x-forwarded-proto')}://${event.request.headers.get('x-forwarded-host')}`,
        'origin from the request header': `${event.request.headers.get('origin')}`,
        'true-client-ip request header': `${event.request.headers.get('true-client-ip')}`,
        'headers': `${JSON.stringify(event.request.headers)}`,
    });

    event.locals.user = jwt ? JSON.parse(Buffer.from(jwt, 'base64').toString('utf8')) : null;
    return resolve(event);
}