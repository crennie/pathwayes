import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://24.69.177.152:8080/ext/pw-dev/graphql';

const encode = encodeURIComponent;

//const responseBody = res => res.body;
const responseBody = res => res

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}


const _gql_query = query_string =>
  superagent.post(`${API_ROOT}`, { query: query_string })
      //.type('text/plain')
      .type('application/json')
      .use(tokenPlugin)
      .then(responseBody)
const requests = {
  /* TODO: Look for library, or think of better way to make general GQL query/mutation
    - specifically, need to convert JS object to GQL in generic way
    -  Maybe look at using "variables" request field, instead of putting all create data in "query"
  */
  mutation: query_string =>
    _gql_query(query_string),
  query: query_string =>
    _gql_query(query_string),
  gql: query_string => 
    _gql_query(query_string),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  login: ({ accessCode }) =>
    requests.gql(`mutation {
        accessCodeLogin(accessCode:"${accessCode}")
      }`)
}


const Exploration = {
  create: ({ domainId, organizationId }) => {
    const WORKAROUND_DATE = '2018-12-12'
    return requests.gql(`mutation {
      createUserExploration(userExploration:{
        domainId:${domainId},
        organizationId:${organizationId},
        explorationCompletionDate: "${WORKAROUND_DATE}"
      }) {
        userExplorationId
        domainId
        acceptedTerms
        accessCode
        modifiedDate
      }
    }`)
  },
  update: ({ userExplorationId, form_data }) =>
    requests.gql(`mutation {
      updateUserExploration(userExploration:${ JSON.stringify(form_data) })
      {
        acceptedTerms
        accessCode
      }
    }`)
}

export default {
  fakeLoad: (ms_delay) => {
    return new Promise( (resolve, reject) => {
      setTimeout(resolve, ms_delay);
    })
  },
  Auth,
  Exploration,
  setToken: _token => { token = _token; },

  API_ROOT
}