import { useNavigation, useRouteError } from "react-router-dom";
import LinkButton from "../components/ui/LinkButton";
import { useEffect } from "react";

function ErrorPage({ setLoaded }) {
  const error = useRouteError();

  const navigation = useNavigation();
  useEffect(() => {
    setLoaded(true);
  }, [navigation.state, setLoaded]);

  let title = "Something went wrong 😢";
  let message = error.data?.message || "An error occurred.";

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }
  console.log(error.data?.message || error);

  return (
    <div className="h-screen font-figtree text-white  bg-[#14213d] flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl  font-bold">{title}</h1>
      <p className="text-lg">{message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default ErrorPage;
