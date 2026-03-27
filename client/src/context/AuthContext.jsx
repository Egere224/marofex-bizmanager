import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore login when app reloads
  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedToken !== "undefined") {
  setToken(storedToken);
} else {
  localStorage.removeItem("token"); // 🔥 auto-clean bad token
}

    try {
  if (storedUser && storedUser !== "undefined") {
    setUser(JSON.parse(storedUser));
  }
} catch (error) {
  console.error("Invalid user in storage");
  localStorage.removeItem("user");
}

    setLoading(false);

  }, []);

  // Login function
  const login = (userData, token) => {

    setUser(userData);
    setToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

  };

  // Logout function
  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}