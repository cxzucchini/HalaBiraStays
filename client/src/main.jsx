import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";

const rawApiUrl = (import.meta.env.VITE_API_URL || "")
  .trim()
  .replace(/\/+$/, "");

axios.defaults.baseURL = rawApiUrl.endsWith("/api")
  ? rawApiUrl.slice(0, -4)
  : rawApiUrl;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);