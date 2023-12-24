import { Navigate } from "react-router-dom";
import { useAuthContextProvider } from "../context/auth";

const AuthRequired = ({ children }) => {
  const { isAuth } = useAuthContextProvider();

  if (isAuth) {
    return children;
  }

  return <Navigate to={"/auth"} replace />;
};

export default AuthRequired;
