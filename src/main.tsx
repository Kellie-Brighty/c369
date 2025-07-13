import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/Router.tsx";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
