import React from "react";

function InputArea(props) {
  return (
    <div className="form">
      <input onChange={props.listItem} type="text" value={props.newItem} />
      {
        <button onClick={props.check ? props.addListItem : () => {}}>
          {/* <button onClick={addListItem}> */}
          <span>Add</span>
        </button>
      }
    </div>
  );
}

export default InputArea;
