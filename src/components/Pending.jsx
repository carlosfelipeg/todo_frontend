import React from 'react';
import PendingItems from './PendingItems';

const Pending = ({ pending }) => {
  const handleSubmit = (body) => {
    const username = "admin";
    const password = "admin";

    const headers = new Headers({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      "Content-Type": "application/json",
    });

    const url = "http://localhost:3001/api/todos/update";

    fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body)
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
      .catch(() => console.log('An error occurred while adding the todo item'));
  }

  return (
    <div>
      <h4>Pending</h4>
      {pending.map((todo, i) => {
        return (
          <PendingItems key={i} todo={todo} handleSubmit={handleSubmit} />
        )
      })}
    </div>
  )
}

export default Pending;