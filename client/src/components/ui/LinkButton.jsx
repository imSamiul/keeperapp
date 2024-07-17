import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function LinkButton({ children, to, ...props }) {
  const navigate = useNavigate();
  const className =
    " text-[#fca311] opacity-80 hover:opacity-100 hover:underline";

  if (to === "-1")
    return (
      <Button
        classNames="bg-[#fca311] text-white hover:bg-white hover:text-black py-2 text-base"
        onClick={() => navigate(-1)}
      >
        {children}
      </Button>
    );

  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
}

export default LinkButton;
