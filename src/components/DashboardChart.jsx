import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function DashboardChart({ dashboard }) {
  const data = {
    labels: ["Mahasiswa", "Mata Kuliah", "User", "Audit Log"],
    datasets: [
      {
        label: "Total Data",
        data: [
          dashboard.totalMahasiswa ?? 0,
          dashboard.totalMataKuliah ?? 0,
          dashboard.totalUser ?? 0,
          dashboard.totalAuditLog ?? 0,
        ],
      },
    ],
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Grafik Statistik</h5>
        <Bar data={data} />
      </div>
    </div>
  );
}

export default DashboardChart;