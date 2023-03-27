import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { HttpLink } from '@apollo/client/link/http'
import config, { isDev } from '$lib/config'

import { readQuery, subscribeQuery, query, mutation } from './query'

/**
 * Initialize new Client instance
 * @returns Apollo Client
 */
function createServerClient() {
  return new ApolloClient({
    credentials: 'include',
    link: new HttpLink({
      uri: config.apiUrl
    }),
    ssrMode: true,
    cache: new InMemoryCache(),
  })
}

let browserClient = createBrowserClient()
function createBrowserClient() {
  return new ApolloClient({
    credentials: 'omit',
    link: new HttpLink({
      uri: config.apiUrl
    }),
    cache: new InMemoryCache(),
    ssrForceFetchDelay: 100,
    connectToDevTools: isDev,
  })
}

function hydrateApolloClient(client: any, context?: Record<string, string>) {
  browserClient.restore(client as any)

  if (context) {
    browserClient.setLink(
      new HttpLink({
        uri: context.uri,
      }),
    )
  }
  return browserClient
}

export { createServerClient, hydrateApolloClient, readQuery, subscribeQuery, query, mutation }
