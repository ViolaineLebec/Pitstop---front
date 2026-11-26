// /contexts/AuthProvider.jsx
import { useContext, createContext, useState, type ReactNode } from "react";

type AuthData = Record<string, string>;

interface AuthContextType {
  user: string | null;
  login: (data: AuthData) => Promise<boolean>;
  logout: () => void;
  signin: (data: AuthData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const TOKEN = "token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem(TOKEN));

  const signin = async (data: AuthData) => {
    try {
      const response = await fetch("http://api-pitstop.glavingo.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login = async (data: AuthData) => {
    try {
      const response = await fetch("http://api-pitstop.glavingo.com/api/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Login failed");
      }
      const meResponse = await fetch("http://api-pitstop.glavingo.com/api/user", {
        credentials: "include",
        method: "GET",
      });
      if (!meResponse.ok) {
        throw new Error("Failed to fetch user");
      }
      const res = await meResponse.json();
      setUser(res);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signin }}>
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
