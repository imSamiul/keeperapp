export default function Input({ name, classNames, ...props }) {
  return (
    <input
      name={name}
      className={`input   py-2 h-auto rounded-md font-figtree focus:border-none focus:outline-none ${classNames}`}
      {...props}
    />
  );
}
