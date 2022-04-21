import './App.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineUndo } from "react-icons/ai"
import { BsTrashFill, BsCheckLg } from "react-icons/bs"

function App() {
  // State that will hold our data
  const [tasks, setTasks] = useState({})
  // Toggle to rerender upon form submission
  const [didSubmit, setDidSubmit] = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false)
  // const [value, setValue] = useState("")
  // Ref Hook for form 
  const entry = useRef(null)
  const status = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('https://axios-to-do-lf-final.herokuapp.com/todos/table')
        await setTasks(data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [didSubmit, buttonPressed])

  const handleButtons = async (statusChange, id) => {
    try {
      const { status } = await axios.put(`https://axios-to-do-lf-final.herokuapp.com/todos/${id}`, {
        status: statusChange
      })
      
      if (status === 200) {
        setButtonPressed(!buttonPressed)
      } else {
        console.log("Something went wrong")
      }
      
    } catch (err) {
      console.log(err)
    }
    
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    
    try {
      await axios.post('https://axios-to-do-lf-final.herokuapp.com/todos', {
        entry: entry.current.value,
        status: "TO-DO"
      })
      setDidSubmit(!didSubmit)
      entry.current.value = ""
    } catch (err) {
      console.log(err)
    }


  }

  const handleDelete = async (id) => {
    try {
        await axios.delete(`https://axios-to-do-lf-final.herokuapp.com/todos/${id}`)
    } catch (err) {
      console.log()
    } finally {
      navigate(0)
    }
  }

  return (
      <div className="App">
        <h3>My To Do List:</h3>
        <form className="form">
          <label>New Item</label>
          <input ref={entry} type="text" placeholder="Please enter a to do item..." />
          <button style={{visibility: 'hidden'}} onClick={handleSubmit}>Add</button>
        </form>
        <h2>To-Do</h2>
          <ul>
            {
              tasks["TO-DO"] ?
              tasks["TO-DO"].map((item, i) => {
                return(
                  <div className='task-container'>
                    <div className='text-container'>
                    <li key={i}><Link to={`/${item._id}`}>{item.entry}</Link></li>
                    </div>
                    <div className='button-container'>
                    <button onClick={() => { handleButtons("COMPLETED", item._id) }}><BsCheckLg /></button>
                    <button onClick={() => { handleDelete(item._id) }}><BsTrashFill /></button>
                    </div>
                  </div>
                )
              })
              : 
              ""
            }
          </ul>
          <h2>Completed</h2>
          <ul>
            {
              tasks["COMPLETED"] ?
              tasks["COMPLETED"].map((item, i) => {
                return(
                  <div className='task-container'>
                    <div className='text-container'>
                    <li key={i}><Link style={{textDecoration: 'line-through'}} to={`/${item._id}`}>{item.entry}</Link></li>
                    </div>
                    <div className='button-container'>
                    <button onClick={() => { handleButtons("TO-DO", item._id) }}><AiOutlineUndo /></button>
                    <button onClick={() => { handleDelete(item._id) }}><BsTrashFill /></button>
                    </div>
                  </div>
                )
              })
              : 
              ""
            }
          </ul>
      </div>
  );
}

export default App;