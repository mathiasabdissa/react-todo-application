import { useState } from "react";
import logo from "./logo.svg";
import Another from "./Another";
import "./App.css";
// import './reset.css';

function App() {
  // const [count, setCount] = useState(0);

  // const someStyle = {
  //   //background:'blue',
  //   color: "white",
  //   fontSize: "28px",
  //   fontWeight: "bold",
  // };

  // function decrement() {
  //   setCount(count - 1);
  // }

  // function increment() {
  //   setCount(count + 1);
  // }

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEdititng: false,
    },
    {
      id: 2,
      title: "Go Grocery",
      isComplete: false,
      isEdititng: false,
    },
    {
      id: 3,
      title: "Takee over world",
      isComplete: false,
      isEdititng: false,
    },
  ]);

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);
    setTodoInput("");
    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
  }

  const [todoInput, setTodoInput] = useState("");
  const [idForTodo, setIdForTodo] = useState(4);

  function handleInput(event) {
    setTodoInput(event.target.value);
  }
  function deleteTodo(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }
  function completeTodo(id) {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  }
  
  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }


  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={todoInput}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox" onChange={() => completeTodo(todo.id)} checked={todo.isComplete?true:false}/>

                {!todo.isEdititng ?(
                <span
                onDoubleClick={()=>markAsEditing(todo.id)}
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
                ):(
                  
                <input
                    type="text"
                    onBlur={event => updateTodo(event, todo.id)}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        updateTodo(event, todo.id);
                      } else if (event.key === 'Escape') {
                        cancelEdit(event, todo.id);
                      }
                    }}
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                  )}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>
          <span>3 items remaining</span>
        </div>
        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
