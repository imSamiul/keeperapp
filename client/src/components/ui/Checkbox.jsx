import React from "react";

function Checkbox({ className, checked, name, ...props }) {
  return (
    <input
      type="checkbox"
      className={className}
      checked={checked}
      name={name}
      {...props}
    />
  );
}

export default Checkbox;
