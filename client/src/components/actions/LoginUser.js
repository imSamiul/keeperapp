import { redirect } from "react-router-dom";
import { addUser, setToken } from "../../pages/users/userSlice";
import { login } from "../../services/apiUsers";
import store from "../../store";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const res = await login(data);

  if (res) {
    store.dispatch(addUser(res.user));
    store.dispatch(setToken(res.token));
    localStorage.setItem("token", res.token);
    return redirect("/todo");
  } else {
    alert(res);
    return redirect("/login");
  }
}
