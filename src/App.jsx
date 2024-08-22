import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    confirm("Your todo is deleted")
    setTodos(newTodos)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }



  return (
    <>
      <Navbar />
      <div className=' mx-3 md:container bg-violet-100 md:mx-auto my-4 p-2 rounded-xl min-h-[80vh] md:w-1/2'>
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className='addtodo flex my-5 flex-col gap-2'>
          <h2 className='font-bold text-2xl flex my-3 mx-4'>ADD TODO</h2>
          <div className='flex'>
            <input onChange={handleChange} value={todo} type='text' className='w-4/5 rounded-lg px-3 py-1 mx-2 '></input>
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 text-white hover:bg-violet-900 
          p-4 py-2 rounded-lg justify-center' >Save</button>
          </div>
        </div>

        <input onChange={toggleFinished} type='checkbox' className='m-2' checked={showFinished} />Show Finished

        <h1 className='font-bold text-2xl my-2'>Your Todos</h1>
        <div className='todos '>
          {todos.length == 0 && <div>No Todo display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex md:1/2  my-3 justify-between'>
              <div className='flex gap-5 '>
                <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} id='' />
                <div className={item.isCompleted ? "line throught" : ""} >{item.todo}</div>
              </div>
              <div className='button flex h-full'>
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800
                 text-white p-2 py-1 rounded-lg mx-2  hover:bg-violet-900 '><FaEdit /></button>  
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800
                 text-white p-2 py-1 rounded-lg mx-2  hover:bg-violet-900'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
