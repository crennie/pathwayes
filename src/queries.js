import gql from "graphql-tag"

// TODO: Extract common userExploraiton data return fields into fragment
export const FETCH_USER_EXPLORATION = gql`
  query UserExploration($explorationId: String!) {
    userExploration(id: $explorationId) {
      userExplorationId
      domainId
      acceptedTerms
      accessCode
      createdDate
      modifiedDate
    }
  }
`

//export const FRAGMENT_USER_EXPLORATION = 