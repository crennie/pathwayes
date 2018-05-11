import ApolloClient from 'apollo-boost';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory'

const API_ROOT = 'http://24.69.177.152:8080/ext/pw-dev/graphql'

const client = new ApolloClient({
  uri: API_ROOT,
  fetchOptions: {
    // TODO: Not sure we need this?  Is this to do with including auth cookie?
    credentials: 'include'
  },
  request: async (operation) => {
    // Always send a token along if one exists
    const token = await localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      // TODO: sendToLoggingService(graphQLErrors);
      console.log("[Info] graph QL error", graphQLErrors)
    }
    if (networkError) {
      // TODO: logoutUser();
      console.log("[Info] Network error, log out user", networkError)
    }
  },
  clientState: {
    defaults: {
      // TODO: isConnected is from sample code, not sure of its purpose
      isConnected: true,
      currentExplorationId: null,

      // TODO: try having a variable here that says when we should run page mutations?
      pageSubmit: false
    },
    resolvers: {
      // TODO: How to fit this in? It doesn't seem to run
      Query: {
        userExploration: (obj, args, context, info) => {
          console.log("userExploration query:")
          console.log(obj, args, context, info)
        }
      },

      Mutation: {
        // update network status not used...
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected }});
          return null;
        },
        createUserExploration: (obj, args, context, info) => {
          console.log('createExploration mutation: ')
          console.log(obj, args, context, info)
          return null;
        }
      }
    }
  },
  cacheRedirects: {
    Query: {
      // Setup local reads where possible.  Make sure Mutations do a correct cache 'update'
      userExploration: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'UserExploration', id })
    }
  }
});

// Have to alias the ID from UserExploration.  NOTE TODO BUG:  We should just have it be 'id' in DB
client.cache.config.dataIdFromObject = object => {
  switch (object.__typename) {
    case 'UserExploration': return object.userExplorationId ? object.userExplorationId : object.id;
    default: return defaultDataIdFromObject(object);
  }
}

export default client