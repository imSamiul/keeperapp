import { redirect } from "react-router-dom";
import { addUser, setToken } from "../../pages/users/userSlice";
import { login } from "../../services/apiUsers";
import store from "../../store";
import { setAuthToken } from "../../util/auth";

export async function action({ request }) {
  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const errors = {};
  if (authData.email.length < 1) {
    errors.error = "Please fill the email field";
  } else if (
    authData.email.includes("@") === false ||
    authData.email.includes(".") === false
  ) {
    errors.error = "Please enter a valid email address";
  } else if (authData.password.length < 1) {
    errors.error = "Please fill the password field";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  console.log("called");
  const res = await login(authData);

  if (res) {
    store.dispatch(addUser(res.user));
    store.dispatch(setToken(res.token));
    setAuthToken(res.token);
    // localStorage.setItem("token", res.token);
    return redirect("/todo");
  } else {
    alert(res);
    return redirect("/login");
  }
}
