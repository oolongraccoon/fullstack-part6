import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification,notificationModify } from '../reducers/notificationReducer'
const AnecdoteList =  () => {
 
    const anecdotes = useSelector(state =>{
        if (state.filter) {
            return state.anecdotes.filter(anecdote =>
              anecdote.content.toUpperCase().includes(state.filter.toUpperCase())
          )
          } else {
            return state.anecdotes
          }
        })
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {

      console.log('vote', anecdote.id)
      dispatch(voteAnecdote(anecdote.id))
      dispatch(notificationModify(anecdote.content,5))
    //   dispatch(setNotification(`you voted '${anecdote.content}'`))
 
    //   setTimeout(() => {
    //     dispatch(setNotification('')) 
    //   }, 5000)
    }
    return(
        <div>
            {[...anecdotes].sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}
export default AnecdoteList