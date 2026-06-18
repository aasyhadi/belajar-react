import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import DataTable from "../components/DataTable";

import auditLogService from "../services/auditLogService";
import auditLogColumns from "../config/auditLogColumns";
import usePagination from "../hooks/usePagination";

import exportExcel from "../utils/exportExcel";
import exportPdf from "../utils/exportPdf";

function AuditLogPage() {
  const [search, setSearch] = useState("");

  // =====================
  // Query
  // =====================
  const {
    data: auditLogs = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["auditLogs"],
    queryFn: auditLogService.getAll,
  });

  // =====================
  // Filter
  // =====================
  const filteredAuditLogs = auditLogs.filter((item) =>
    JSON.stringify(item ?? {})
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =====================
  // Pagination
  // =====================
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

      {isLoading && (
        <LoadingSpinner text="Mengambil data audit log..." />
      )}

      <ErrorAlert
        message={queryError ? "Gagal mengambil data audit log." : ""}
      />

      {!isLoading && !queryError && (
        <>
          <div className="mb-3">
            <button
              className="btn btn-success me-2"
              onClick={() =>
                exportExcel(filteredAuditLogs, "audit-log.xlsx")
              }
            >
              Export Excel
            </button>

            <button
              className="btn btn-danger"
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
          </div>

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