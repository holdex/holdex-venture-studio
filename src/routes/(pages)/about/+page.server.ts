import { loadMessage } from '$lib/models/message'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    const options = await loadMessage(locals.apolloClient, "004feb61ea4b4df986cd5e83afad140f");

    return {
        queryOptions: JSON.stringify(options),
        apollo: locals.apolloClient.extract()
    }
}
