import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const APP_HOSTNAME = IS_PRODUCTION ?  `http://${ window.location.host }` : 'http://localhost';

const link = createHttpLink({
  credentials: 'include',
  uri: `${ APP_HOSTNAME }/graphql`
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
      },
      User : {
        fields: {
          subordinates : {
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

export { APP_HOSTNAME, client };