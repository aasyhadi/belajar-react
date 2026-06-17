import { useState } from "react";
import { toast } from "react-toastify";

import MataKuliahForm from "../components/MataKuliahForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import DataTable from "../components/DataTable";

import mataKuliahService from "../services/mataKuliahService";
import mataKuliahColumns from "../config/mataKuliahColumns";
import usePagination from "../hooks/usePagination";
import useCrud from "../hooks/useCrud";

import exportExcel from "../utils/exportExcel";
import exportPdf from "../utils/exportPdf";

function MataKuliahPage() {
  const [search, setSearch] = useState("");

  const {
    items: mataKuliah,
    loading,
    error,
    showConfirm,
    setShowConfirm,
    saveItem,
    askDelete,
    confirmDelete,
  } = useCrud(mataKuliahService, "Mata kuliah");

  const filteredMataKuliah = mataKuliah.filter((item) =>
    (item.namaMataKuliah ?? item.nama ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedMataKuliah,
  } = usePagination(filteredMataKuliah, 5);

  const handleCreate = async (formData) => {
    try {
      await saveItem(formData);
    } catch (error) {
      toast.error("Gagal menyimpan mata kuliah.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Data Mata Kuliah</h1>

      <MataKuliahForm onSuccess={handleCreate} />

      <hr />

      <SearchBox
        value={search}
        placeholder="Cari mata kuliah..."
        onChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      {loading && <LoadingSpinner text="Mengambil data mata kuliah..." />}

      <ErrorAlert message={error} />

      {!loading && !error && (
        <>

          <div className="mb-3">
            <button
              className="btn btn-success me-2"
              onClick={() =>
                exportExcel(filteredMataKuliah, "data-mata-kuliah.xlsx")
              }
            >
              Export Excel
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                exportPdf(
                  mataKuliahColumns,
                  filteredMataKuliah,
                  "data-mata-kuliah.pdf",
                  "Data Mata Kuliah"
                )
              }
            >
              Export PDF
            </button>
          </div>

          <DataTable
            columns={mataKuliahColumns}
            data={paginatedMataKuliah}
            actions={(item) => (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => askDelete(item.id)}
              >
                Hapus
              </button>
            )}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <ConfirmModal
        show={showConfirm}
        title="Hapus Mata Kuliah"
        message="Yakin ingin menghapus data mata kuliah ini?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default MataKuliahPage;