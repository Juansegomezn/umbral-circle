import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs, {
      withCredentials: true
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    try {
      await makeRequest.post("/auth/logout");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await makeRequest.get("/auth/check"); 
      } catch (err) {
        if (err.response?.status === 401) {
          setCurrentUser(null);
          localStorage.removeItem("user");
        }
      }
    };
    if (currentUser) checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}