import { useState, useEffect, useRef } from 'react';
import List from './Components/list.js';
import { mytodos } from './data/todos.js';
import { v4 as uuid } from 'uuid';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


function App() {
  const [todos, setTodos] = useState(mytodos);
  const [value, setValue] = useState('');



  useEffect(() => {
    const localTodos = localStorage.getItem('todos');
    if (localTodos) setTodos(JSON.parse(localTodos));
    alert('Welcome to your todo app! \n\n 1. To add a todo, type in the input field and click the add button. \n\n2. To delete a todo,double click the text. \n\n3.To mark a todo as completed,double click the checkmark button. \n\n5.To reorder your todos, drag and drop them into the desired position. \n\nEnjoy!') 
  }, []);


  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  }

  // access local storage
  const saveToLocalStorage = (todos) => {
    if (todos) localStorage.setItem('todos', JSON.stringify(todos));
  }

  // delete from local storage
  const removeItemFromLocalStorage = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
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
    saveToLocalStorage([...todos, newTodo]);
    setValue('');
  }

  // handleDelete function

  const handleRemove = (id) => {
    removeItemFromLocalStorage(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }


  // handle completion
  const handleCompleted = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  }

  const handleDragEnd = (e) => {
    const { active, over } = e;
    // console.log(e);
    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reorderedItems = [...items];
        reorderedItems.splice(oldIndex, 1);
        reorderedItems.splice(newIndex, 0, items[oldIndex]);
        saveToLocalStorage(reorderedItems);
        return reorderedItems;
      });
    }
  }


  return (
    <div className="App bg-zinc-950 h-screen flex flex-col items-center">
      <form action="" className="bg-zinc-900 w-1/2 mt-20 rounded-lg drop-shadow-2xl">
        <h1 className="text-5xl font-bold text-orange-500 text-center mt-12 mb-8">Today's Tasks</h1>
        <div className="flex justify-center items-center mb-12 text-lg ">
          <input className='p-3 outline-0 border-f border-r-0 rounded-r-none border-zinc-500 bg-zinc-900 text-zinc-300 rounded' type="text" value={value} onChange={handleChange} placeholder="Add a Task" />
          <button className="p-3 outline-0 border-f border-l-0 rounded-l-none border-orange-500 text-orange-200  bg-orange-500 rounded" onClick={handleSubmit}>Add Task</button>
        </div>
      </form>

      <div className='bg-zinc-900 mt-12 rounded-lg text-zinc-400 text-lg w-1/2'>
        <div className='flex justify-between mt-6 mx-12 '>
          <p className='text-md'>Priority</p>
          <p className='text-red-700 text-md font-bold'>High</p>
        </div>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={todos.map((todo) => todo.id)} >
            <ul className="flex flex-col justify-center bg-zinc-900 my-8 mx-24">
              {todos.map((todo) => {
                const { id, name, isCompleted } = todo;
                return <List
                  key={id}
                  name={name}
                  id={id}
                  isCompleted={isCompleted}
                  handleRemove={handleRemove}
                  handleCompleted={handleCompleted}
                />
              })}
            </ul>
          </SortableContext>
        </DndContext>
        <p className='flex justify-end mx-12 mb-6 font-bold text-green-700'>Low</p>
        
      </div>

    </div>
  );
}


export default App;
