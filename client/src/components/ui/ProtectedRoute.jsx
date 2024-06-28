import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../components/users/userSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const storeToken = useSelector((state) => state.user.token);
  const localToken = localStorage.getItem("token");
  const isAuthenticated = localToken || storeToken;

  if (!storeToken) {
    dispatch(setToken(localToken));
  }

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
