import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function AuditLogActionChart({ auditLogs }) {
  const data = Object.values(
    auditLogs.reduce((result, item) => {
      const action = item.action || "UNKNOWN";

      if (!result[action]) {
        result[action] = {
          name: action,
          value: 0,
        };
      }

      result[action].value += 1;

      return result;
    }, {})
  );

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>Audit Log per Aksi</h5>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AuditLogActionChart;