import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  credentials: 'include',
  uri: 'http://localhost/graphql'
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          teamMembers: {
            merge(existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  }),
  link
});

export { client };