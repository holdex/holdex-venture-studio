import { getMessage } from '$lib/models/thread'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ data }) => {
    const options = JSON.parse(data.queryOptions)
    const store = await getMessage(data.apollo, options);

    return { store }
}
