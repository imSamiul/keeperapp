import React, { useState } from "react";
let check = false;
function InputArea(props) {
  const [newItem, setItem] = useState("");
  function listItem(event) {
    const value = event.target.value;
    setItem(value);
    check = true;
  }
  return (
    <div className="form">
      <input onChange={listItem} type="text" value={newItem} />

      <button
        onClick={() => {
          check ? props.toAdd(newItem) : alert("Give some value");
          check = false;
          setItem("");
        }}
      >
        {/* <button onClick={addListItem}> */}
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
