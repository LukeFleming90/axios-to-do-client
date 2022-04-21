
import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Show = () => {
  // grabbing the param passed to us in the route using the useParams Hook
  const { id } = useParams()
  // Component state that will hold our data
  const [showData, setShowData] = useState({})

  // useEffect to collect our data upon page load
  useEffect(() => {
    (async () => {
      try {
        // Assign our axios response to a variable. Use the id from params to get our speciifc task
        const {data} = await axios.get(`https://axios-to-do-lf-final.herokuapp.com/todos/${id}`)
        // Set the showData state to the data we recieved from our server. 
        setShowData(data)
      } catch (err) {

        console.log(err)
      }
    })()
  },[])

  return(
    <div className="App">
      <Link to="/">Home</Link>
      <div className="taskContainer"> 
        <h1>Entry: {showData.entry}</h1>
        <p>Status: {showData.status}</p>
      </div>
    </div>
  )
}

export default Show