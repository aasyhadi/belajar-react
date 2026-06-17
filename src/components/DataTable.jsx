import { useState } from "react";

function DataTable({ columns, data, actions }) {
  const rows = Array.isArray(data) ? data : [];

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        key,
        direction: "asc",
      };
    });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const valueA = a[sortConfig.key] ?? "";
    const valueB = b[sortConfig.key] ?? "";

    if (valueA < valueB) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }

    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "";

    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>No</th>

          {columns.map((column) => (
            <th
              key={column.key}
              style={{ cursor: "pointer" }}
              onClick={() => handleSort(column.key)}
            >
              {column.label}
              {getSortIcon(column.key)}
            </th>
          ))}

          {actions && <th>Aksi</th>}
        </tr>
      </thead>

      <tbody>
        {sortedRows.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 2} className="text-center">
              Tidak ada data.
            </td>
          </tr>
        ) : (
          sortedRows.map((item, index) => (
            <tr key={item.id ?? index}>
              <td>{index + 1}</td>

              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item)
                    : item[column.key] ?? "-"}
                </td>
              ))}

              {actions && <td>{actions(item)}</td>}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default DataTable;