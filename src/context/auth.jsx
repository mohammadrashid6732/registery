import React, { createContext, useContext, useState } from "react";

const authContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const storage = Boolean(JSON.parse(localStorage.getItem("isAuth")));
  const [isAuth, setIsAuth] = useState(storage);

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", true);
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  };

  return (
    <authContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContextProvider = () => {
  return useContext(authContext);
};
