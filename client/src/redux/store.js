import {combineReducers,applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'
const finalReducer = combineReducers({ // it can control multiple slices of state
    rootReducer
});
const intialState={
    rootReducer : {
        cartItems: localStorage.getItem("cartItems") // local storage will only take string , therefore parse it in string
         ? JSON.parse(localStorage.getItem("cartItems"))
          :[],  
    },
}
 const middleware = [thunk] // (thunk) - a piece of code that does some delayed work
const store = createStore(finalReducer,intialState,composeWithDevTools(applyMiddleware(...middleware)))
// applyMiddleware function to apply an array of middleware to the store. The ...middleware syntax spreads the middleware array, passing each middleware as an argument to applyMiddleware

export default store ;