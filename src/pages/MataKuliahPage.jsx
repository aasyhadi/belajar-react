import { useState } from "react";
import { toast } from "react-toastify";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import MataKuliahForm from "../components/MataKuliahForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import DataTable from "../components/DataTable";
import TableSkeleton from "../components/TableSkeleton";

import mataKuliahService from "../services/mataKuliahService";
import mataKuliahColumns from "../config/mataKuliahColumns";
import usePagination from "../hooks/usePagination";

import exportExcel from "../utils/exportExcel";
import exportPdf from "../utils/exportPdf";

function MataKuliahPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    data: mataKuliahData = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["mataKuliah"],
    queryFn: mataKuliahService.getAll,
  });

  const mataKuliah = Array.isArray(mataKuliahData) ? mataKuliahData : [];

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

  const saveMutation = useMutation({
    mutationFn: (formData) => mataKuliahService.create(formData),
    onSuccess: () => {
      toast.success("Data mata kuliah berhasil disimpan.");
      queryClient.invalidateQueries({ queryKey: ["mataKuliah"] });
    },
    onError: () => {
      toast.error("Gagal menyimpan mata kuliah.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => mataKuliahService.remove(id),
    onSuccess: () => {
      toast.success("Data mata kuliah berhasil dihapus.");
      setShowConfirm(false);
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["mataKuliah"] });
    },
    onError: () => {
      toast.error("Gagal menghapus mata kuliah.");
    },
  });

  const handleCreate = (formData) => {
    saveMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!deleteId) {
      toast.error("ID mata kuliah tidak ditemukan.");
      return;
    }

    deleteMutation.mutate(deleteId);
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

      {isLoading && <TableSkeleton rows={5} columns={3} />}

      <ErrorAlert
        message={queryError ? "Gagal mengambil data mata kuliah." : ""}
      />

      {!isLoading && !queryError && (
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
                onClick={() => handleDelete(item.id)}
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
        onCancel={() => {
          setShowConfirm(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default MataKuliahPage;