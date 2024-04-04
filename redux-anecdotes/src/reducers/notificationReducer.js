import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
 
      return action.payload
    }
  }
})
export const notificationModify = (content,time)=>{
    return async dispatch => {
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(setNotification('')) 
    }, time*1000)
}
}
export const { setNotification} = notificationSlice.actions
export default notificationSlice.reducer