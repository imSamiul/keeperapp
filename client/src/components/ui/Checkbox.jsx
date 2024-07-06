function Checkbox({ className, checked, name, ...props }) {
  return (
    <input
      type="checkbox"
      className={`checkbox  checked:border-none ${className}`}
      checked={checked}
      name={name}
      {...props}
    />
  );
}

export default Checkbox;
