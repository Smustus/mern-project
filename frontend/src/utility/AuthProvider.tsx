import { useState, type ReactNode } from "react";
import AuthContext from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /* const [user, setUser] = useState<string | null>("test"); */

  const user = "test"; //placeholder

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
