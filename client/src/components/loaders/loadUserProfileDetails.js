import { redirect } from "react-router-dom";
import { getUserProfileDetails } from "../../services/apiUsers";
import { getAuthToken } from "../../util/auth";

export async function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/register");
  }
  const profileInfo = await getUserProfileDetails();
  console.log(profileInfo);
  return profileInfo;
}
