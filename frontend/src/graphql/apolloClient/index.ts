import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const link = createHttpLink({
  credentials: 'include',
  uri: IS_PRODUCTION ?  `http://${ window.location.host }/graphql` : 'http://localhost/graphql'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export {client};