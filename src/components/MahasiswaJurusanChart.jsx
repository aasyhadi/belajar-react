import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MahasiswaJurusanChart({ mahasiswa }) {
  const data = Object.values(
    mahasiswa.reduce((result, item) => {
      const jurusan = item.jurusan || "Tidak diketahui";

      if (!result[jurusan]) {
        result[jurusan] = {
          jurusan,
          total: 0,
        };
      }

      result[jurusan].total += 1;

      return result;
    }, {})
  );

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Mahasiswa per Jurusan</h5>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="jurusan" />
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

export default MahasiswaJurusanChart;