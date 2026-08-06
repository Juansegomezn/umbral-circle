import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";
import { getImageUrl } from "../utils/getImageUrl";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const formatUserData = (user) => {
    if (!user) return null;
    return {
      ...user,
      profilePic: getImageUrl(user.profilePic, "defaultProfilePic.png"),
      coverPic: getImageUrl(user.coverPic, "defaultCoverPic.jpg"),
    };
  };

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return formatUserData(savedUser);
  });

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs, {
      withCredentials: true
    });
    const formattedUser = formatUserData(res.data);
    setCurrentUser(formattedUser);
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
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
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