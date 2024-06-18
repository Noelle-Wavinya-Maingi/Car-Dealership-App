/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking the user: ");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleSetUser = (user) => {
    setUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: handleSetUser, logout: handleLogout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  return useContext(UserContext);
};
