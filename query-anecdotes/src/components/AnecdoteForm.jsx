import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getAnecdotes, createAnecdotes} from '../requests'
import {useNotificationDispatch} from './NotificationContext'
const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
    
   })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length >= 5) {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
      
    } else {
      console.error('Anecdote must be at least 5 characters long')
    }
    
  }
  

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
