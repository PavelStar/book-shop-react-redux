const defaultState = {
    responseItems: [],
    snippetsItems: [],
    searchValue: '',
    showSnippets: 'snippets',
    fullBookInfo: [],
    isLoading: false,
    btnClickLoad: false,
    isSnippetsOpen: false
}

const RESPONSE_ITEMS = 'RESPONSE_ITEMS'
const SNIPPETS_ITEMS = 'SNIPPETS_ITEMS'
const GET_FULL_BOOK_INFO = 'GET_FULL_BOOK_INFO'
const SHOW_SNIPPETS = 'SHOW_SNIPPETS'
const SEARCH_VALUE = 'SEARCH_VALUE'
const IS_LOADING = 'IS_LOADING'
const BTN_CLICK_LOAD = 'BTN_CLICK_LOAD'
const IS_SNIPPETS_OPEN = 'IS_SNIPPETS_OPEN'

export const responseReducer = (state = defaultState, action) => {
    switch (action.type) {
        case RESPONSE_ITEMS:
            return { ...state, responseItems: action.payload }

        case SNIPPETS_ITEMS:
            return { ...state, snippetsItems: action.payload }

        case GET_FULL_BOOK_INFO:
            return { ...state, fullBookInfo: action.payload }

        case SEARCH_VALUE:
            return { ...state, searchValue: action.payload }

        case SHOW_SNIPPETS:
            return { ...state, showSnippets: action.payload }

        case IS_LOADING:
            return { ...state, isLoading: action.payload }

        case BTN_CLICK_LOAD:
            return { ...state, btnClickLoad: action.payload }

        case IS_SNIPPETS_OPEN:
            return { ...state, isSnippetsOpen: action.payload }

        default:
            return state
    }
}

export const responseItemsAction = (payload) => ({ type: RESPONSE_ITEMS, payload })
export const snippetsItemsAction = (payload) => ({ type: SNIPPETS_ITEMS, payload })
export const getFullBookInfoAction = (payload) => ({ type: GET_FULL_BOOK_INFO, payload })
export const showSnippetsAction = (payload) => ({ type: SHOW_SNIPPETS, payload })
export const searchValueAction = (payload) => ({ type: SEARCH_VALUE, payload })
export const isLoadingAction = (payload) => ({ type: IS_LOADING, payload })
export const btnClickLoadingAction = (payload) => ({ type: BTN_CLICK_LOAD, payload })
export const isSnippetsOpenAction = (payload) => ({ type: IS_SNIPPETS_OPEN, payload })
