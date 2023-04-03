/** @type {import('@sveltejs/kit').HandleClientError} */
export const handleClientError = async ({ error, event }) => {
    const _error = JSON.parse(error);
    return {
        code: error.code ?? '500',
        message: error.message,
        error: _error,
    }
}
