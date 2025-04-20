export default function Input({ value, name, classNames, ...props }) {
  classNames += " " + classNames;
  return (
    <input
      name={name}
      className={`input py-2 h-auto rounded-sm  focus:border-none focus:outline-none ${classNames}`}
      {...props}
      value={value}
    />
  );
}
