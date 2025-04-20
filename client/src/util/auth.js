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
  Cookies.set("otpEmail", otpEmail, { expires: 5 / 1440 });
  // 1 day = 24 hours
  // 1 hour = 60 minutes
  // 1 day = 24*60 = 1440 minutes

  // So, 5 minutes = (5 / 1440) days.
}
export function getOtpEmail() {
  const otpEmail = Cookies.get("otpEmail");
  if (!otpEmail) {
    console.log("No token found");
    return null;
  }
  return otpEmail;
}

export function addOtpToken(otpToken) {
  Cookies.set("otpToken", otpToken, { expires: 5 / 1440 });
}
export function getOtpToken() {
  const otpToken = Cookies.get("otpToken");
  if (!otpToken) {
    console.log("No otp token");
    return null;
  }
  return otpToken;
}
