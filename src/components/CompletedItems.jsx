import React, { useState } from 'react';

const CompletedItems = ({ todo, handleSubmit }) => {
  const [completedTodo] = useState(todo);

  const handleCompletedChange = (event) => {
    handleSubmit({
      ...completedTodo,
      completed: event.target.checked
    })
  }

  const handleDelete = () =>{
    const username = "admin";
    const password = "admin";

    const headers = new Headers({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      "Content-Type": "application/json",
    });

    const url = "http://localhost:3001/api/todos/destroy";

    fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(completedTodo)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response);
        window.location.reload(false);
      })
      .catch(() => console.log('An error occurred while deleting the todo item'));
  }

  const myStyle = {
    marginRight: "10px",
  };
  
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" onChange={handleCompletedChange} checked={completedTodo.completed} id={`checkbox${completedTodo.id}`} />
      <label style={myStyle} className="form-check-label" htmlFor={`checkbox${completedTodo.id}`}>
        {completedTodo.title}
      </label>
      <label style={myStyle} className="form-check-label" htmlFor={`checkbox${completedTodo.id}`}>
        {completedTodo.description}
      </label>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CompletedItems;