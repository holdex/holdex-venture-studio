import { createServerClient } from '$components/ApolloClient'

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {

    event.locals.apolloClient = createServerClient()

    const response = await resolve(event)
    return response
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error, event }) {
    return {
        code: error.code ?? '500',
        message: error.message,
        error
    }
}