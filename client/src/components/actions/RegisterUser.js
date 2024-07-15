import { redirect } from "react-router-dom";
import { addUser, setToken } from "../../pages/users/userSlice";
import { registerUser } from "../../services/apiUsers";
import store from "../../store";
import { setAuthToken } from "../../util/auth";

export async function action({ request }) {
  const formData = await request.formData();
  const authData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  };
  const errors = {};
  if (authData.password !== authData.rePassword) {
    errors.message = "Passwords do not match";
  }
  if (authData.password.length < 6) {
    errors.message = "Password must be at least 6 characters";
  }
  if (authData.password.includes("password")) {
    errors.message = "Password cannot contain the word password";
  }
  if (authData.email.includes("@") === false) {
    errors.message = "Email must be valid";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const res = await registerUser(authData);
  if (res.status === 409) {
    errors.message = res.message;
    return errors;
  }
  if (res) {
    console.log(res);
    store.dispatch(addUser(res.user));
    store.dispatch(setToken(res.token));
    setAuthToken(res.token);
    // localStorage.setItem("token", res.token);
    return redirect("/todo");
  } else {
    return redirect("/register");
  }
}
