import { createStore, combineReducers } from 'redux'
import counter from './reducer/counter'
import showStatus from './reducer/showStatus'

const myStore = combineReducers({
    counter,
    showStatus
})

export default createStore(myStore);