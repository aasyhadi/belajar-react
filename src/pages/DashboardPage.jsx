import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";
import LoadingSpinner from "../components/LoadingSpinner";
import DashboardChart from "../components/DashboardChart";
import StatCard from "../components/StatCard";

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await dashboardService.getDashboard();

      console.log("Dashboard Data :", result);

      setDashboard(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return <LoadingSpinner text="Mengambil data dashboard..." />;
  }

  return (
    <>
      <h1>Dashboard</h1>

      <div className="row">
        <StatCard
          title="Total Mahasiswa"
          value={dashboard.totalMahasiswa}
          className="text-bg-primary"
        />

        <StatCard
          title="Total Mata Kuliah"
          value={dashboard.totalMataKuliah}
          className="text-bg-success"
        />

        <StatCard
          title="Total User"
          value={dashboard.totalUser}
          className="text-bg-warning"
        />

        <StatCard
          title="Total Audit Log"
          value={dashboard.totalAuditLog}
          className="text-bg-danger"
        />
      </div>

      <DashboardChart dashboard={dashboard} />

    </>
  );
}

export default DashboardPage;