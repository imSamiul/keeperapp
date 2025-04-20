export default function Button({
  children,
  classNames,
  iconClassNames,
  ...props
}) {
  classNames += " " + classNames;

  return (
    <button
      className={`btn shadow-none   min-h-6 h-auto font-figtree rounded-sm    ${classNames}`}
      {...props}
    >
      {iconClassNames && <i className={iconClassNames}></i>}
      {children}
    </button>
  );
}
