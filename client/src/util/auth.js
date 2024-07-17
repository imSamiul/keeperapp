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

export function addOtpEmail(otpEmail) {
  Cookies.set("otpEmail", otpEmail, { expires: 20 / 1440 });
  // 1 day = 24 hours
  // 1 hour = 60 minutes
  // 1 day = 1440 minutes

  // So, 10 minutes = 20 / 1440 days.
}
