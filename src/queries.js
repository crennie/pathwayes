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

export const FRAGMENT_USER_PATHWAY = gql`
  fragment FullPathwayInfo on UserPath {
    userPathwayId
    userExplorationId
    pathwayType
    pathwayId
    pathwayTitle
    pathwayStatus
    pathwayCompletionDate
    createdDate
    createdBy
    modifiedDate
    modifiedBy
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
  mutation UpdateUserExploration($acceptedTerms: Boolean!, $explorationId: Int!) {
    updateUserExploration(userExploration: {
      userExplorationId: $explorationId,
      acceptedTerms: $acceptedTerms
    }) {
      userExplorationId
      domainId
      acceptedTerms
      accessCode
      createdDate
      modifiedDate
    }
  }`/* TODO: For some reason, fragment not working on this Update {
      ... FullExplorationInfo
    }
    ${FRAGMENT_USER_EXPLORATION}
  }`
  */


export const ACCESS_CODE_LOGIN = gql`
  mutation AccessCodeLogin ($accessCode: String) {
    accessCodeLogin(accessCode: $accessCode)
  }`




export const FETCH_USER_REPORT = gql`
query UserReport($userReportId: String!) {
  userReport(id: $userReportId)
}`
// TODO: Add User_Report fragment?
// TODO BUG: ID should be Int instead of String 



// Always create the pathwayType = 0 which means associated to system pathway
// Always set pathwayStats to 0, which means not started
export const CREATE_USER_PATHWAY = gql`
mutation CreateUserPathway($explorationId: Int!, $pathwayId: Int! $title: String!) {
  createUserPathway(userPathway:{
    userExplorationId: $explorationId,
    pathwayId: $pathwayId,
    pathwayType: 0,
    pathwayTitle: $title,
    pathwayStatus: 0 
  }) {
    ... FullPathwayInfo
  }
}
${FRAGMENT_USER_PATHWAY}
`

export const UPDATE_USER_PATHWAY = gql`mutation { fakeCall(id: "foo") { foo }  }`
/*
gql`
mutation UpdateUserPathway($userPathwayId: Int!, $pathwayId: Int! $title: String!) {
  updateUserPathway(userPathway:{
    userExplorationId: $explorationId,
    pathwayId: $pathwayId,
    pathwayType: 0,
    pathwayTitle: $title,
    pathwayStatus: 0 
  }) {
    ... FullPathwayInfo
  }
}
${FRAGMENT_USER_PATHWAY}
`
*/

/*
userPathwayId: Int!
stepType: Int
questionID: Int
answerId: Int
answerDisplayText: String
inlineResourceType: Int
inlineResourceId: Int
internalResourceAction: Int
internalResourceRating: Int
resourceTitle: String
resourceResultText: String
resourceDescriptionText: String
resourceResultData: String
*/

// Always create the pathwayType = 0 which means associated to system pathway
// Always set pathwayStats to 0, which means not started
export const CREATE_USER_STEP = gql`
mutation CreateUserStep($userPathwayId: Int!) {
  createUserStep(userStep:{
    userPathwayId: $userPathwayId
  })
}`

// TODO: Just implement as local test data for now
export const FETCH_USER_STEPS = gql`
query UserSteps {
  userSteps
}`

// TODO: Just implement as local test data for now
export const FETCH_USER_STEP = gql`
query UserStep($userStepId: Int!) {
  userStep(id: $userStepId)
}`


// TODO: Can this actually be in FETCH_USER_EXPLORATION INSTEAD??
export const FETCH_USER_PATHWAYS = gql`
query {
  userPathways
}`


// TODO: Get the current data, THIS IS ALL LOCAL FOR RIGHT NOW
export const FETCH_SYSTEM_DATA = gql`
query SystemData($nodeId: Int!) {
  systemData(id: $nodeId) {
    questionID
    displayID
    domainID
    pathwayID
    questionTitle
    questionTitleText
    questionType
    answers {
      title
      displayText,
      nextItemType
      nextItemID,
      pathwayToCreate
    }
  }
}`