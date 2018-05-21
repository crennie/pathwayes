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
      pageSubmit: false,

      'systemData({"id":1})': {
        __typename: "FakeQuestion",
        questionID: 1,
        displayID: 1,
        domainID: 1,
        pathwayID: 1, // TODO: Maybe this one isn't part of a pathway yet?
        questionTitle: "Enter some basic information about yourself",
        questionTitleText: "",
        questionType: 1,
        answers: [{
            __typename: "FakeAnswer",
            title: "This is one item I want to be asked questions about",
            displayText: "This is extra text that can be added to an answer to help someone answer it.",
            nextItemType:	2,
            nextItemID: 2,
            pathwayToCreate: 10
          }, {
            __typename: "FakeAnswer",
            title: "This is a second item I want to be asked questions about",
            displayText: null,
            nextItemType:	2,
            nextItemID: 2,
            pathwayToCreate: 11
          }
        ]
      },
      
      'systemData({"id":2})': {
        __typename: "FakeQuestion",
        questionID: 2,
        displayID: 2,
        domainID: 1,
        pathwayID: 1,
        questionTitle: "Are you male or female?",
        questionTitleText: "Please tell us if you are male or female.  This information is only used to provide context and is not stored as personal information.",
        questionType: 2,
        answers: [{
            __typename: "FakeAnswer",
            title: "Male",
            displayText: "My gender is male",
            nextItemType:	2,
            nextItemID: 3,
            pathwayToCreate: null

          }, {
            __typename: "FakeAnswer",
            title: "Female",
            displayText: "My gender is female",
            nextItemType:	3,
            nextItemID: 4,
            pathwayToCreate: null
          }
        ]
      },

      'systemData({"id":3})': {
        __typename: "FakeQuestion",
        questionID: 3,
        displayID: 3,
        domainID: 1,
        pathwayID: 1,
        questionTitle: "How old are you?",
        questionTitleText: "Please tell us the age range that you belong to from the list below.  This informaiton is only used to provide context and is not stored as personal information.",
        questionType: 2,
        answers: [{
            __typename: "FakeAnswer",
            title: "Under 20",
            displayText: "I am under 20 years old",
            nextItemType:	3,
            nextItemID: 4,
            pathwayToCreate: null
          },
          {
            __typename: "FakeAnswer",
            title: "20-40",
            displayText: "I am 20 to 40 years old",
            nextItemType:	3,
            nextItemID: 5,
            pathwayToCreate: null
          },
          {
            __typename: "FakeAnswer",
            title: "40-60",
            displayText: "I am 40 to 60 years old",
            nextItemType:	3,
            nextItemID: 6,
            pathwayToCreate: null
          },
          {
            __typename: "FakeAnswer",
            title: "Over 60",
            displayText: "I am over 60 years old",
            nextItemType:	3,
            nextItemID: 7,
            pathwayToCreate: null
          }
        ]
      },

      'systemData({"id":4})': {
        __typename: "FakeQuestion",
        questionID: 4,
        displayID: 4,
        domainID: 1,
        pathwayID: 1,
        questionTitle: "Fake Ending #4",
        questionTitleText: "ending description",
        questionType: 9,
        answers: []
      },

      'systemData({"id":5})': {
        __typename: "FakeQuestion",
        questionID: 5,
        displayID: 5,
        domainID: 1,
        pathwayID: 1,
        questionTitle: "Fake Ending #5",
        questionTitleText: "ending description",
        questionType: 9,
        answers: []
      },

      'systemData({"id":6})': {
        __typename: "FakeQuestion",
        questionID: 6,
        displayID: 6,
        domainID: 1,
        pathwayID: 1,
        questionTitle: "Ending #6",
        questionTitleText: "ending description",
        questionType: 9,
        answers: []
      },

      'systemData({"id":7})': {
        __typename: "FakeQuestion",
        questionID: 7,
        displayID: 7,
        domainID: 1,
        pathwayID: 1,
        questionTitle: "Ending #7",
        questionTitleText: "ending description",
        questionType: 9,
        answers: []
      },


      userSteps: []

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
      // Setup mock front-end data reads
      systemData: (_, { id }, { getCacheKey }) => {
        console.log(id, getCacheKey)
        var a = getCacheKey({ __typename: 'FakeQuestion', id })
        console.log(a)
        return a
      },

      // Setup local reads where possible.  Make sure Mutations do a correct cache 'update'
      userPathways: (foo, bar, bat, boo) => {
        console.log(foo, bar, bat, boo)
        return null;
      },

      userSteps: (foo, bar, bat, boo) => {
        console.log(foo, bar, bat, boo)
        return null;
      },

      // Setup local reads where possible.  Make sure Mutations do a correct cache 'update'
      userExploration: (_, { id }, { getCacheKey }) => {
        var a = getCacheKey({ __typename: 'UserExploration', id });
        console.log(a)
        return a
      }
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