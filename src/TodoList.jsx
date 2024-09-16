import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {
  const [todo, setTodo] = useState({ description: "", date: "" });
  const [todos, setTodos] = useState([]);

  const handleAdd = (event) => {
    event.preventDefault();

    if (!todo.description.trim()) {
      alert("Type description first!");
      return;
    }

    const newTodo = {
      date: todo.date,
      description: todo.description,
    };

    setTodos([newTodo, ...todos]);
    setTodo({ description: "", date: "" });
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <>
      <header><h1>SIMPLE TODOLIST</h1></header>
      <div>
        <form onSubmit={handleAdd}>
          <label>
            Date:
            <input
              type="date"
              onChange={event => setTodo({ ...todo, date: event.target.value })}
              value={todo.date}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              onChange={event => setTodo({ ...todo, description: event.target.value })}
              placeholder="Description"
              value={todo.description}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>
      <div>
        <TodoTable todos={todos} onDelete={deleteTodo} />
      </div>
    </>
  );
}

export default TodoList;
