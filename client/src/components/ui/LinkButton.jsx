import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    " text-[#fca311] opacity-80 hover:opacity-100 hover:underline";

  if (to === "-1")
    return <Button onClick={() => navigate(-1)}>{children}</Button>;

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
