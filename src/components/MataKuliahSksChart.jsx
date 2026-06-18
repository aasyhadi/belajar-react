import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MataKuliahSksChart({ mataKuliah }) {
  const data = Object.values(
    mataKuliah.reduce((result, item) => {
      const sks = item.sks || 0;
      const label = `SKS ${sks}`;

      if (!result[label]) {
        result[label] = {
          sks: label,
          total: 0,
        };
      }

      result[label].total += 1;

      return result;
    }, {})
  );

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Mata Kuliah berdasarkan SKS</h5>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="sks" />
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

export default MataKuliahSksChart;