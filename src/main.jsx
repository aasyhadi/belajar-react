import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>
);
