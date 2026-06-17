import { useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import DataTable from "../components/DataTable";

import auditLogService from "../services/auditLogService";
import auditLogColumns from "../config/auditLogColumns";
import useCrud from "../hooks/useCrud";
import usePagination from "../hooks/usePagination";

import exportExcel from "../utils/exportExcel";
import exportPdf from "../utils/exportPdf";

function AuditLogPage() {
  const [search, setSearch] = useState("");

  const {
    items: auditLogs,
    loading,
    error,
  } = useCrud(auditLogService, "Audit Log");

  const filteredAuditLogs = auditLogs.filter((item) =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedAuditLogs,
  } = usePagination(filteredAuditLogs, 10);

  return (
    <div>
      <h1>Audit Log</h1>

      <SearchBox
        value={search}
        placeholder="Cari audit log..."
        onChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      {loading && <LoadingSpinner text="Mengambil data audit log..." />}
      <ErrorAlert message={error} />

      {!loading && !error && (
        <>

          <button
            className="btn btn-success mb-3"
            onClick={() => exportExcel(filteredAuditLogs, "audit-log.xlsx")}
          >
            Export Excel
          </button>

          <button
            className="btn btn-danger mb-3 ms-2"
            onClick={() =>
              exportPdf(
                auditLogColumns,
                filteredAuditLogs,
                "audit-log.pdf",
                "Audit Log"
              )
            }
          >
            Export PDF
          </button>
          
          <DataTable
            columns={auditLogColumns}
            data={paginatedAuditLogs}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default AuditLogPage;