import {ApolloClient, InMemoryCache, createHttpLink, gql} from '@apollo/client';

const link = createHttpLink({
  credentials: 'include',
  uri: 'http://localhost/graphql'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

// client
//   .query({
//     query: gql`
//     query {
//       getClient(id: 3) {
//         id,
//         name
//       }
//     }
//     `
//   })
//   .then((result) => alert(JSON.stringify(result)))
//   .catch((error) => alert(error.message));

export {client};