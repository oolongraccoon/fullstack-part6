import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getAnecdotes,updateAnecdotes} from './requests'
import {useNotificationDispatch} from './components/NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const voteAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => (anecdote.id !== newAnecdote.id) ? anecdote : newAnecdote))
    }
   })
   const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    console.log('vote')
    dispatch({
      type: "VOTE",
      payload: {anecdote}
    })
  }
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.error ) {
    return 'Anecdote Service is not avilable due to problems in server'
  }
  
  const anecdotes = result.data



  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
