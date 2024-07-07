export default function Button({
  children,
  classNames,
  iconClassNames,
  ...props
}) {
  classNames += " " + classNames;

  return (
    <button
      className={`btn bg-[#fca311] border-none text-white min-h-6 h-auto font-figtree rounded-sm  hover:bg-white hover:text-black hover:border-solid ${classNames}`}
      {...props}
    >
      {iconClassNames && <i className={iconClassNames}></i>}
      {children}
    </button>
  );
}
