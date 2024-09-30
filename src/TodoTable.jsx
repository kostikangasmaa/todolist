import React from 'react';

function TodoTable({ todos, onDelete }) {
  return (
    <table>
    
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.date}</td>
            <td>{todo.priority}</td>
            <td>{todo.description}</td>
            <td>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;