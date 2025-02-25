import { AuthContextType, AuthProviderProps } from "@/types/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsRegistered(true);
    }
  }, [isRegistered]);

  return (
    <AuthContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
