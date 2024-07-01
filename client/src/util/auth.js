import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  return token;
}

export function checkAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/register");
  }

  return redirect("/todo");
}
