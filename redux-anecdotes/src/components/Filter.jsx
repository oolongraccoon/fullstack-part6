import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
 
const Filter = () => {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
   
        dispatch(setFilter(content))
      // input-field value is in variable event.target.value
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input value={filter} name="filter" onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter