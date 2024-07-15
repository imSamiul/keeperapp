import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

export function getAuthToken() {
  // const token = localStorage.getItem("token");
  const token = Cookies.get("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  return token;
}

export function checkAuthToken() {
  // const token = localStorage.getItem("token");
  const token = Cookies.get("token");

  if (token) {
    return redirect("/todo");
  }
  return null;
}

export function setAuthToken(token) {
  Cookies.set("token", token, { expires: 7 });
}

export function removeAuthToken() {
  Cookies.remove("token");
}
