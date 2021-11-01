import { createStore, combineReducers, applyMiddleware } from 'redux';
import { booksPageReducer } from './reducers/booksPageReducer'
import { responseReducer } from './reducers/responseReducer'
import { bookInfoReducer } from './reducers/bookInfoReducer'
import { paginationReducer } from './reducers/paginationReducer'
import { cartReducer } from './reducers/cartReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    booksPageReducer, 
    responseReducer,
    bookInfoReducer,
    paginationReducer,
    cartReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))