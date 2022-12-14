/*=============================================== Apollo client ===============================================*/

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

// const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI
const GRAPHQL_URI = "https://blog-apollo.vercel.app/graphql"

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("authToken") || "",
        },
    }
})

const client = new ApolloClient({
    uri: GRAPHQL_URI,
    link: new HttpLink({
        ...authLink,
        uri: GRAPHQL_URI,
    }),
    cache: new InMemoryCache(),
})

export default client
