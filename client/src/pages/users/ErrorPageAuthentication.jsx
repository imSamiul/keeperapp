import { useRouteError } from "react-router-dom";
import LinkButton from "../../components/ui/LinkButton";

function ErrorPageAuthentication() {
  const error = useRouteError();

  let title = "Something went wrong 😢";
  let message = error.data?.message || "An error occurred.";

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }
  console.log(error.data?.message || error);
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-xl  font-bold">{title}</h1>
      <p className="text-base">{message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default ErrorPageAuthentication;
