import React, { useState } from "react";
import InputArea from "./InputArea";
import ShowListItem from "./toDoItem";

function App() {
  const [names, setName] = useState([]);

  function addListItem(newItem) {
    setName((names) => {
      return [...names, newItem];
    });
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
      <InputArea toAdd={addListItem} />
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
