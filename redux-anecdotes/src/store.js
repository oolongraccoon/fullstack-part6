import anecdotesReducer,{appendAnecdote} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'
 
export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification:notificationReducer
  }
})
anecdoteService.getAll().then(anecdotes =>
    anecdotes.forEach(anecdote => {
      store.dispatch(appendAnecdote(anecdote))
    })
  )
// const reducer = combineReducers({
//   anecdotes: anecdotesReducer,
//   filter: filterReducer
// })
// const store = createStore(reducer)
console.log(store.getState())
 