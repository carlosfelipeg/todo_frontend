import React, { useState } from 'react';

const PendingItems = ({ todo, handleSubmit }) => {
  const [editing, setEditing] = useState(false);
  const [pendingTodo, setPendingTodo] = useState(todo);

  const handleClick = () => {
    setEditing(true);
  }

  const handleTitleChange = (event) => {
    setPendingTodo({
      ...pendingTodo,
      title: event.target.value
    })
  }

  const handleDescriptionChange = (event) => {
    setPendingTodo({
      ...pendingTodo,
      description: event.target.value
    })
  }

  const handleCompletedChange = (event) => {
    handleSubmit({
      ...pendingTodo,
      completed: event.target.checked
    })
  }

  const handleDelete = () =>{
    const url = "http://localhost:3001/api/todos/destroy";

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pendingTodo)
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
      handleSubmit(pendingTodo);
    }
  }

  const myStyle = {
    marginRight: "10px",
  };
  
  return editing ? (
    <div className="form-check editing">
      <input className="form-check-input" disabled type="checkbox" defaultChecked={pendingTodo.completed} />
      <input type="text" className="form-control-plaintext" value={pendingTodo.title} onChange={handleTitleChange} onKeyDown={handleKeyDown} autoFocus/>
      <input type="text" className="form-control-plaintext" value={pendingTodo.description} onChange={handleDescriptionChange} onKeyDown={handleKeyDown} autoFocus/>
    </div>
  ) : (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" defaultChecked={pendingTodo.completed} onChange={handleCompletedChange} id={`checkbox${pendingTodo.id}`} />
      <label style={myStyle} className="form-check-label" htmlFor={`checkbox${pendingTodo.id}`} onClick={handleClick}>
        {pendingTodo.title}
      </label>
      <label style={myStyle} className="form-check-label description-label" htmlFor={`checkbox${pendingTodo.id}`} onClick={handleClick}>
        {pendingTodo.description}
      </label>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default PendingItems;