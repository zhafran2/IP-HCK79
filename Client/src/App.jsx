import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import myLogo from './Quizha.png'
import { Provider, useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { decremented, incremented, incrementedByValue, setTodos } from './slice/counterslice'


function App() {
  const [number, setNumber] = useState(0)
  const dispatch = useDispatch()

  const counter = useSelector(state => {
    return state.counter.value
  })
  const todos = useSelector(state => state.counter.todos)

  useEffect(() => {
    async function fetchTodos() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "https://the-trivia-api.com/v2/questions"
        })
        dispatch(setTodos(data))
        console.log(data, "<---- HALAMAN FETCH");


      } catch (error) {
        console.log(error, "<----- HALAMAN REDUX");
      }
    }
    fetchTodos()
  }, [])


  function handleIncrement() {
    dispatch(incremented())
  }

  function handleDecrement() {
    dispatch(decremented())
  }

  function handleIncrementByValue() {
    dispatch(incrementedByValue(+number))
  }

  
  return (
    <>
      <div>
            <h1>Redux Counting, Value = {counter} </h1>

            <button className='btn' onClick={handleIncrement}> Bertambah</button>
            <button className='btn' style={{backgroundColor:"pink"}} onClick={handleDecrement}> Berkurang</button>

            <input type="number" onChange={e=> setNumber(e.target.value)} />
      </div>
    <button onClick={handleIncrementByValue}>Submit</button>
        <p> {JSON.stringify(todos)}</p>
    </>
  )
}

export default App
