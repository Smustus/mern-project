import { createContext } from "react";

const AuthContext = createContext<{ user: string | null }>({
  user: null,
});

export default AuthContext;
