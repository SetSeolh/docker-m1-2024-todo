import { useEffect, useState } from 'react'
import './App.css'
import Todo from './Todo';
import NewTodo from './NewTodo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const req = await fetch("http://localhost:3000");
      const todos = await req.json();
      setTodos(todos);
    })()
  }, []);

  const deleteTodo = async todo=>{
    await fetch("http://localhost:3000/"+todo._id, {
      method: "DELETE"
    });
    setTodos(todos.filter(t=>t._id !== todo._id));
  };

  const changeCheckTodo = async (todo, checked)=>{
    await fetch("http://localhost:3000/check/"+todo._id+"/"+checked);
    todo.checked = checked;
    setTodos(todos.map(t=>t._id === todo._id ? todo : t));
  }

  const ajoutTodo = (todo)=>{
    setTodos([...todos, todo]);
  }

  return (
    <>
      <img src="/Docker-Symbol.png"/>
      {todos.map(todo=>{
        return <Todo 
          key={todo._id}
          todo={todo} 
          deleteTodo={deleteTodo}
          changeCheckTodo={changeCheckTodo}
        />
      })}
      <NewTodo ajoutTodo={ajoutTodo} />
    </>
  )
}

export default App
