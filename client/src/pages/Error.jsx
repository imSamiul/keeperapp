import { useRouteError } from "react-router-dom";
import LinkButton from "../components/ui/LinkButton";

function ErrorPage() {
  const error = useRouteError();
  console.log(error.data.message || error.data);

  return (
    <div className="h-screen font-figtree text-white  bg-[#14213d] flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl  font-bold">Something went wrong 😢</h1>
      <p className="text-lg">{error.data.message || error.data}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default ErrorPage;
