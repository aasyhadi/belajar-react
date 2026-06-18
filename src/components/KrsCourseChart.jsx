import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function KrsCourseChart({ krs }) {
  const data = Object.values(
    krs.reduce((result, item) => {
      const course =
        item.namaMataKuliah || "Unknown";

      if (!result[course]) {
        result[course] = {
          course,
          total: 0,
        };
      }

      result[course].total += 1;

      return result;
    }, {})
  );

  return (
    <div className="card mt-4"  style={{ minHeight: "380px", }}>
      <div className="card-body">
        <h5>KRS per Mata Kuliah</h5>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="course" />
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

export default KrsCourseChart;