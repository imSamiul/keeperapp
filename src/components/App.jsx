import React, { useState } from "react";
let check = false;
function App() {
  const [newItem, setItem] = useState("");
  const [names, setName] = useState([]);
  function listItem(event) {
    const value = event.target.value;
    setItem(value);
    check = true;
  }
  function addListItem() {
    setName((names) => {
      return [...names, newItem];
    });
    check = false;
    setItem("");
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
          <input onChange={listItem} type="text" value={newItem} />
          {check ? (
            <button onClick={addListItem}>
              {/* <button onClick={addListItem}> */}
              <span>Add</span>
            </button>
          ) : (
            <button>
              <span>Add</span>
            </button> 
           )}
      </div>
      <div>
        <ul>
          {names.map((name) => (
            <li key={Math.random()}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
