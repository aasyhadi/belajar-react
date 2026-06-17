import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MahasiswaPage from "./pages/MahasiswaPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import MataKuliahPage from "./pages/MataKuliahPage";
import MahasiswaDetailPage from "./pages/MahasiswaDetailPage";
import { ToastContainer } from "react-toastify";
import AuditLogPage from "./pages/AuditLogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mahasiswa"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MahasiswaPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mahasiswa/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MahasiswaDetailPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
            path="/dashboard"
            element={<DashboardPage />}
        />

        <Route
          path="/matakuliah"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
              <MainLayout>
                <MataKuliahPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit-log"
          element={
            <ProtectedRoute allowedRoles={["Super Admin"]}>
              <MainLayout>
                <AuditLogPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  );
}

export default App;