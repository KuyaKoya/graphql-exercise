import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ApolloClients } from '@vue/apollo-composable';
import { provide } from 'vue';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://api.github.com/graphql',
});

const token = process.env.VUE_APP_GITHUB_ACCESS_USER_TOKEN;

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : null,
  },
}));

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function initApollo() {
  return provide(ApolloClients, {
    default: apolloClient,
  });
}

export {
  initApollo,
  apolloClient,
};
