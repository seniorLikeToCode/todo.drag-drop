import { useState } from 'react';
import List from './Components/list.js';
import { mytodos } from './data/todos.js';
import {v4 as uuid} from 'uuid';


function App() {
  const [todos, setTodos] = useState(mytodos);
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  }

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || value.length < 3) return alert('Todo must be at least 3 characters long');
    const newTodo = {
      id: uuid(),
      name: value,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setValue('');
  }

  // handleDelete function

  const handleRemove = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <form action="" className="form">
        <h1 className="">Today's Tasks</h1>
        <div className="input-container">
          <input type="text" value={value} onChange={handleChange} placeholder="Add a Task" />
          <div className="submit-btn">
            <button onClick={handleSubmit} className="btn">Add Task</button>
          </div>
        </div>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => {
          const { id, name, isCompleted } = todo;
          return <List
            key={id}
            name={name}
            id={id}
            isCompleted={isCompleted} 
            handleRemove={handleRemove}
            />
        })}
      </ul>

    </div>
  );
}

export default App;
