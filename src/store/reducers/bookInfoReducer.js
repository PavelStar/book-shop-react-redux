const defaultState = {
  currentBook: null
}

const CURRENT_BOOK = 'CURRENT_BOOK'

export const bookInfoReducer = (state = defaultState, action) => {
  switch (action.type) {

    case CURRENT_BOOK:
      return { ...state, currentBook: action.payload }



    default:
      return state
  }
}

export const showCurrentBookAction = (payload) => ({ type: CURRENT_BOOK, payload })