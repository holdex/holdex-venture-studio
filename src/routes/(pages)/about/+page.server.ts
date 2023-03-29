import { loadMessage } from '$lib/models/message'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    const options = await loadMessage(locals.apolloClient, "69d4ab8971234f1db97cab8333a60419");

    return {
        queryOptions: JSON.stringify(options),
        apollo: locals.apolloClient.extract()
    }
}
