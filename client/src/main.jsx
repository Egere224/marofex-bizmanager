import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/themeContext.jsx";
import { BusinessProvider } from "./context/BusinessContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BusinessProvider><ThemeProvider><App /></ThemeProvider></BusinessProvider>
    </AuthProvider>
  </StrictMode>
);