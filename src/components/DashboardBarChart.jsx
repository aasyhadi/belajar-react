import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardBarChart({ dashboard }) {
  const data = [
    {
      name: "Mahasiswa",
      total: dashboard.totalMahasiswa ?? 0,
    },
    {
      name: "Mata Kuliah",
      total: dashboard.totalMataKuliah ?? 0,
    },
    {
      name: "User",
      total: dashboard.totalUser ?? 0,
    },
    {
      name: "Audit Log",
      total: dashboard.totalAuditLog ?? 0,
    },
  ];

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Grafik Statistik Data</h5>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardBarChart;