import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'YOUR_GRAPHQL_ENDPOINT_URL' // Replace with your actual GraphQL endpoint
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});