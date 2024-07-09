import { json } from "react-router-dom";
import { getAuthToken } from "../util/auth";

// const API_URL = "http://192.168.31.207:3000/users";
const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export async function registerUser(userData) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    if (res.status === 409) {
      return { status: 409, message: data.message };
    } else {
      const error = new Error(data.message);
      error.status = res.status;
      throw error;
    }
  } catch (error) {
    throw json({ message: error.message }, { status: error.status || 500 });
  }
}

export async function login(userData) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      const error = new Error(data.message);
      error.status = res.status;
      throw error;
    }
  } catch (error) {
    throw json({ message: error.message }, { status: error.status || 500 });
  }
}

export async function logout() {
  try {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data.status;
    } else {
      const error = new Error(data.message);
      error.status = res.status;
      throw error;
    }
  } catch (error) {
    throw json({ message: error.message }, { status: error.status || 500 });
  }
}
