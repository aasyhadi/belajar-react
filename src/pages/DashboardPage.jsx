import { useQuery } from "@tanstack/react-query";

import dashboardService from "../services/dashboardService";
import mahasiswaService from "../services/mahasiswaService";
import krsService from "../services/krsService";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import StatCard from "../components/StatCard";
import DashboardBarChart from "../components/DashboardBarChart";
import MahasiswaJurusanChart from "../components/MahasiswaJurusanChart";
import auditLogService from "../services/auditLogService";
import AuditLogActionChart from "../components/AuditLogActionChart";
import mataKuliahService from "../services/mataKuliahService";
import MataKuliahSksChart from "../components/MataKuliahSksChart";
import KrsCourseChart from "../components/KrsCourseChart";
import KrsSksMahasiswaChart from "../components/KrsSksMahasiswaChart";
import {
  FaUserGraduate,
  FaBook,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

function DashboardPage() {
  const {
    data: dashboardResponse,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardService.getDashboard,
  });

  const {
    data: mahasiswaData = [],
    isLoading: isMahasiswaLoading,
  } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: mahasiswaService.getAll,
  });

  const {
    data: auditLogData = [],
    isLoading: isAuditLogLoading,
  } = useQuery({
    queryKey: ["auditLogs"],
    queryFn: auditLogService.getAll,
  });

  const {
    data: mataKuliahData = [],
    isLoading: isMataKuliahLoading,
  } = useQuery({
    queryKey: ["mataKuliah"],
    queryFn: mataKuliahService.getAll,
  });

  const {
    data: krsData = [],
    isLoading: isKrsLoading,
  } = useQuery({
    queryKey: ["krs"],
    queryFn: krsService.getAll,
  });

  const dashboard = dashboardResponse?.data;

  if (isDashboardLoading) {
    return <LoadingSpinner text="Mengambil data dashboard..." />;
  }

  if (dashboardError) {
    return <ErrorAlert message="Gagal mengambil data dashboard." />;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="row">
        <StatCard
          title="Total Mahasiswa"
          value={dashboard?.totalMahasiswa}
          icon={<FaUserGraduate />}
          className="text-bg-primary"
        />

        <StatCard
          title="Total Mata Kuliah"
          value={dashboard?.totalMataKuliah}
          icon={<FaBook />}
          className="text-bg-success"
        />

        <StatCard
          title="Total User"
          value={dashboard?.totalUser}
          icon={<FaUsers />}
          className="text-bg-warning"
        />

        <StatCard
          title="Total Audit Log"
          value={dashboard?.totalAuditLog}
          icon={<FaClipboardList />}
          className="text-bg-danger"
        />

        <StatCard
          title="Total KRS"
          value={dashboard?.totalKrs}
          className="text-bg-info"
        />

        <StatCard
          title="MK Favorit"
          value={dashboard?.mataKuliahTerfavorit}
          className="text-bg-secondary"
        />

        <StatCard
          title="Jumlah Peminat"
          value={dashboard?.jumlahPeminat}
          className="text-bg-dark"
        />

      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <DashboardBarChart dashboard={dashboard} />
        </div>

        <div className="col-md-6">
          {!isMahasiswaLoading && (
            <MahasiswaJurusanChart mahasiswa={mahasiswaData} />
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {!isAuditLogLoading && (
            <AuditLogActionChart auditLogs={auditLogData} />
          )}
        </div>

        <div className="col-md-6">
          {!isMataKuliahLoading && (
            <MataKuliahSksChart mataKuliah={mataKuliahData} />
          )}
        </div>

        <div className="col-md-6">
          {!isKrsLoading && (
            <KrsCourseChart krs={krsData} />
          )}        
        </div>

        <div className="col-md-6">
          {!isKrsLoading && (
            <KrsSksMahasiswaChart krs={krsData} />
          )}
        </div>

      </div>

    </div>
  );
}

export default DashboardPage;