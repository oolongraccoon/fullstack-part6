import { createContext, useReducer, useContext } from 'react'


const notificationReducer = (state, action) => {
    switch (action.type) {
      case "VOTE":
          return `Anecdote ${action.payload.content} voted`
      case "CREATE":
          return `Anecdote ${action.payload.content} created`
      case "ERROR":
          return `Too short anecdote, must have length 5 or more`
      default:
          return state
    }
  }
  
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, undefined)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}
export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
  }
  
export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}  
 
export default NotificationContext