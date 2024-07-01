import { getAuthToken } from "../util/auth";

const API_URL = "http://localhost:3000/listNames";

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
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Could not create list");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message); // Log the error message to the console
  }
}

export async function getTaskList() {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Could not fetch list names");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
