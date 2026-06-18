import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function KrsSksMahasiswaChart({ krs }) {
  const data = Object.values(
    krs.reduce((result, item) => {
      const mahasiswa = item.namaMahasiswa || "Unknown";

      if (!result[mahasiswa]) {
        result[mahasiswa] = {
          mahasiswa,
          totalSks: 0,
        };
      }

      result[mahasiswa].totalSks += item.sks || 0;

      return result;
    }, {})
  );

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Total SKS per Mahasiswa</h5>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="mahasiswa" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default KrsSksMahasiswaChart;