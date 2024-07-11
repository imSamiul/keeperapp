import { json } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const API_URL = `${import.meta.env.VITE_API_URL}/listNames`;

// POST: create list
export async function createList(listNameData) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(listNameData),
    });
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.message);
      error.status = res.status;
      throw error;
    }

    return data;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status || 500 });
  }
}

// GET: get list names
export async function getTaskList() {
  try {
    const res = await fetch(`${API_URL}`, {
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

// PATCH:
// Edit list name
export async function editListName(listId, listNameObj) {
  try {
    const res = await fetch(`${API_URL}/edit/${listId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(listNameObj),
    });
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.message);
      error.status = res.status;
      throw error;
    }
    return data;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status || 500 });
  }
}
