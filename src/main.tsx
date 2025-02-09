import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Ensure correct path
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider> {/* ✅ Wrap App inside AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
