import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios"; // Import axios for API calls
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token"); // Get JWT from localStorage
      if (!token) return;

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication failed:", error.response?.data || error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    };

    verifyUser();
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
