const API_URL = "http://localhost:3000/listNames";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzlkODc4NTIzYWYzNTY2N2I3NDY1OCIsImlhdCI6MTcxOTI2MTMwNH0.JLJQaKP11JjqVOMTmnxGfSBkzcv-B4mpTmE0a6Ni9Hw";
export async function createList(listNameData) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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
