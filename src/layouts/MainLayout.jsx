import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const role = user?.role;
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-4">
        <span className="text-white me-4">
          Welcome, {user?.name}
        </span>

        <Link className="navbar-brand me-4" to="/dashboard">
          Belajar React MVC
        </Link>

        <Link className="btn btn-outline-light btn-sm me-2" to="/dashboard">
          Dashboard
        </Link>

        <Link className="btn btn-outline-light btn-sm me-2" to="/mahasiswa">
          Mahasiswa
        </Link>

        {(role === "Admin" || role === "Super Admin") && (
          <Link className="btn btn-outline-light btn-sm me-2" to="/matakuliah">
            Mata Kuliah
          </Link>
        )}

        {role === "Super Admin" && (
          <Link className="btn btn-outline-light btn-sm me-2" to="/audit-log">
            Audit Log
          </Link>
        )}

        <button
          className="btn btn-outline-warning btn-sm me-2"
          onClick={toggleTheme}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>

        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </nav>

      <div className="container mt-4">{children}</div>
    </>
  );
}

export default MainLayout;