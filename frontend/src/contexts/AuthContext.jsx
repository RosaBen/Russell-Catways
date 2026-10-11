import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("logged");
    if (storedEmail) {
      setCurrentUserEmail(storedEmail);
      setIsConnected(true);
    } else {
      setCurrentUserEmail(null);
      setIsConnected(false);
    }
    setIsAuthReady(true);
  }, []);

  const loginAction = (email) => {
    sessionStorage.setItem("logged", email);
    setCurrentUserEmail(email);
    setIsConnected(true);
  };

  const cleanSessionStorage = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("selectedUser");
    sessionStorage.removeItem("selectedBookingId");
    sessionStorage.removeItem("selectedBookingCatwayNumber");
    sessionStorage.removeItem("selectedCatway");
    sessionStorage.removeItem("prevPage");
  };

  const logoutClean = () => {
    cleanSessionStorage();
    setCurrentUser(null);
    setCurrentUserEmail(null);
    setIsConnected(false);
  };

  const value = useMemo(
    () => ({
      isConnected,
      currentUser,
      currentUserEmail,
      isAuthReady,
      loginAction,
      logoutClean,
      setCurrentUser,
      cleanSessionStorage,
      setIsConnected,
    }),
    [isConnected, currentUserEmail, isAuthReady, currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be inside <AuthProvider></AuthProvider>");
  }
  return ctx;
}
