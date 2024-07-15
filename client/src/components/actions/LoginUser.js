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
  if (!authData.email || !authData.password) {
    errors.message = "Please fill in all fields";
  }
  if (errors.message) {
    return errors;
  }

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
