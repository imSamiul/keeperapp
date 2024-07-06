import { json } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const API_URL = "http://192.168.31.207:3000/tasks";

// GET:
export async function getListTasks(listName) {
  try {
    const res = await fetch(`${API_URL}/${listName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
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

export async function getTask(taskId) {
  try {
    const res = await fetch(`${API_URL}/edit/${taskId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
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

// POST:
export async function createTask(taskData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(taskData),
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

// PATCH:
export async function handleCompleteTask(taskId) {
  try {
    const res = await fetch(`${API_URL}/check/${taskId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
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
