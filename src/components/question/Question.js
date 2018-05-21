import React from 'react'
import AnswerSelectForm from '../../forms/AnswerSelect'

import { Mutation } from "react-apollo"


// TODO: I don't know if we'll actually update user pathway
//  or if we should be just creating / updating user steps here
import { UPDATE_USER_PATHWAY, FETCH_USER_STEPS } from '../../queries'


// TODO: How to get user pathway information into this component?? use graphQL and compose??

export default (props) => {
  const { questionID, questionTitle, questionTitleText, answers, client } = props
  return (
    <div className="Question template_item" key={questionID}>
      <p className="question_text">{questionTitle}</p>
      <p className="question_extra_text">{questionTitleText}</p>
      <Mutation
          mutation={UPDATE_USER_PATHWAY}
          update={(store, { data: { updateUserPathway } }) => {
            console.log(store, updateUserPathway)
            // TODO: Update cache with mutation result
          }}
        >
        {(updateUserPathway, { data, loading, error, called }) => {
            console.log(data, loading, error, called, updateUserPathway)
            const formSubmitSuccess = (result) => {
              console.log("ON SUBMIT SUCCESS?", result)
              /*
              updateUserPathway({ variables: {
                userPathwayId: 'FOO' //TODO,
              } })
              */
            // TODO: Hide the update call for now
            
            console.log("Selected answer", result)
            const selectedAnswerIndex = parseInt(result.answer[0]),
              selectedAnswerText = answers[selectedAnswerIndex].title

            let userStepToApi = {
              id: Math.random(),
              questionID,
              modifiedDate: new Date(),
              createdDate: new Date(),
              __typename: 'FakeUserStep'
            }
            let response = client.readQuery({ query: FETCH_USER_STEPS })
            let foundIndex = -1
            response.userSteps.forEach((s, index) => {
              if (foundIndex !== -1) {
                return
              }
              if (s.questionID === questionID) {
                Object.assign(userStepToApi, s)
                foundIndex = index
              }
            })
            if (foundIndex !== -1) {
              response.userSteps.splice(foundIndex, 1)
            }

            // Update selected item and re-push
            userStepToApi.answerIndex = selectedAnswerIndex
            userStepToApi.answer = selectedAnswerText
            response.userSteps.push(userStepToApi)
            

            // Fake a create UserStep
            // Add the new step => 
            client.writeQuery({
              query: FETCH_USER_STEPS,
              data: {
                userSteps: [...response.userSteps]
              }
            })

            Promise.resolve().then( () => {
                // Go to the page defined in the next answerID
                console.log(result)
                const answer = result.answer,
                  answer_index = parseInt(answer),
                  selected_answer = Number.isNaN(answer_index) ? {} : answers[answer_index],
                  { nextItemID, nextItemType } = selected_answer
                
                // TODO: What if next answer is not found?
                if (!nextItemID || !nextItemType) {
                  console.log(`[Error] Invalid next item ID and type: `, selected_answer)
                } else {
                  props.history.push(`/exploration/${props.match.params.id}/progress/${nextItemID}`)
                }
              })
            }

            if (error) {
              return <div><i>There was an error saving the answer you selected</i></div>
            }
            
            return (
              <AnswerSelectForm questionID={questionID} answers={answers} onSubmitSuccess={formSubmitSuccess} />
            )
          }}
      </Mutation>
    </div>
  )
}
// TODO: Add some prop types for requiredness!
