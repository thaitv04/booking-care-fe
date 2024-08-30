import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRouterAdmin = () => {
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const token = window.localStorage.getItem("auth_token");
  const role = window.localStorage.getItem("role");

  useEffect(() => {
    if (token && role === "ROLE_ADMIN") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [token, role, location]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouterAdmin;
