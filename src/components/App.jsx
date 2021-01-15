import React, { useState } from "react";
import ShowListItem from "./toDoItem";
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
  function deleteItem(id) {
    setName((preValue) => {
      return preValue.filter((item, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={listItem} type="text" value={newItem} />
        {
          <button onClick={check ? addListItem : () => {}}>
            {/* <button onClick={addListItem}> */}
            <span>Add</span>
          </button>
        }
      </div>
      <div>
        <ul>
          {names.map((name, index) => (
            <ShowListItem
              key={Math.random()}
              id={index}
              item={name}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
