/** @type {import('@sveltejs/kit').HandleClientError} */
export const handleClientError = async ({ error, event }) => {
    return {
        code: error.code ?? '500',
        message: error.message,
        error,
    }
}
