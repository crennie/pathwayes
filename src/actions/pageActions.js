// TODO: This is only for other apps.  Replace with code specific to own App

import agent from '../agent'

import {
  EXPLORATION_TERMS_SELECTION
} from './actionTypes'

export function selectTerms(selected) {
  
  // TODO: Check form validation from actions??
  return {
    type: EXPLORATION_TERMS_SELECTION,
    selected: selected
  }
}

