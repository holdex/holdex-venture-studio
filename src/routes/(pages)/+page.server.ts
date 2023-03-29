import { loadMessage } from '$lib/models/message'
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    const options = await loadMessage(locals.apolloClient, "69d4ab8971234f1db97cab8333a60419");

    return {
        queryOptions: JSON.stringify(options),
        apollo: locals.apolloClient.extract()
    }
}

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email');
        const name = data.get('name');
        const message = data.get('message');

        if (!email) {
            return fail(400, { email, name, message, missing: { email: true } })
        }

        if (!name) {
            return fail(400, { email, name, message, missing: { name: true } })
        }

        if (!message) {
            return fail(400, { email, name, message, missing: { message: true } })
        }

        return { success: true }
    }
}
