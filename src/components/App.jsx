import React, { useState } from "react";
let check = false;
function App() {
  const [names, setName] = useState([]);
  let [newItem, setItem] = useState("");
  function listItem(event) {
    const value = event.target.value;
    setItem(value);
    check = true;
  }
  function addListItem() {
    setName((names) => [...names, newItem]);
    check = false;
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <form>
          <input onChange={listItem} type="text" />
          {check ? (
            <button onClick={addListItem} type="reset">
              {/* <button onClick={addListItem}> */}
              <span>Add</span>
            </button>
          ) : (
            <button type="reset">
              <span>Add</span>
            </button>
          )}
        </form>
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
