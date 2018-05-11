import gql from "graphql-tag"

export const FRAGMENT_USER_EXPLORATION = gql`
  fragment FullExplorationInfo on UserExploration {
    userExplorationId
    domainId
    acceptedTerms
    accessCode
    createdDate
    modifiedDate
  }`

// TODO: Extract common userExploraiton data return fields into fragment
export const FETCH_USER_EXPLORATION = gql`
  query UserExploration($explorationId: String!) {
    userExploration(id: $explorationId) {
      ... FullExplorationInfo
    }
  }
  ${FRAGMENT_USER_EXPLORATION}
`

export const CREATE_USER_EXPLORATION = gql`
  mutation CreateUserExploration($domainId: Int!, $date: String!) {
    createUserExploration(userExploration: {
      domainId: $domainId,
      explorationCompletionDate: $date
    }) {
      ... FullExplorationInfo
    }
  }
  ${FRAGMENT_USER_EXPLORATION}
`


// NOTE: This is just for TOU right now
export const UPDATE_USER_EXPLORATION = gql`
  mutation UpdateUserExploration($acceptedTerms: Boolean!, $explorationId: String!) {
    updateUserExploration(userExploration: {
      userExplorationId: $explorationId
      acceptedTerms: $acceptedTerms,
    }) {
      ... FullExplorationInfo
    }
    ${FRAGMENT_USER_EXPLORATION}
  }`


export const ACCESS_CODE_LOGIN = gql`
  mutation AccessCodeLogin ($accessCode: String) {
    accessCodeLogin(accessCode: $accessCode)
  }`