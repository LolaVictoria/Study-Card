import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged,  signOut } from "firebase/auth";
import PropTypes from "prop-types";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentEmail, setCurrentEmail] = useState(sessionStorage.getItem("email") || "");
  const [currentFirstName, setCurrentFirstName] = useState(sessionStorage.getItem("firstName") || "");
  const [currentLastName, setCurrentLastName] = useState(sessionStorage.getItem("lastName") || "");
 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email || "";
        setCurrentEmail(email);
        sessionStorage.setItem("email", email);

      }
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("firstName", currentFirstName);
    sessionStorage.setItem("lastName", currentLastName);
   
  }, [currentFirstName, currentLastName]);

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentEmail("");
      setCurrentFirstName("");
      setCurrentLastName("");
     

      sessionStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentEmail,
        setCurrentEmail,
        currentFirstName,
        setCurrentFirstName,
        currentLastName,
        setCurrentLastName,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};