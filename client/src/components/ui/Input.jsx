export default function Input({ name, classNames, ...props }) {
  classNames += " " + classNames;
  return (
    <input
      name={name}
      className={`input   py-2 h-auto rounded-sm font-figtree focus:border-none focus:outline-none ${classNames}`}
      {...props}
    />
  );
}
