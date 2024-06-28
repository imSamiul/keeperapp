export default function Button({ children, classNames, ...props }) {
  classNames += " " + classNames;

  return (
    <button
      className={`btn bg-[#fca311] border-none text-white min-h-7 h-auto font-figtree rounded-md hover:bg-white hover:text-black hover:border-solid ${classNames}`}
      {...props}
    >
      {children}
    </button>
  );
}
