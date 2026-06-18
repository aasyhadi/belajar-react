import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { showSuccess, showError } from "../utils/notification";

import MahasiswaForm from "../components/MahasiswaForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import ConfirmModal from "../components/ConfirmModal";
import DataTable from "../components/DataTable";
import TableActions from "../components/TableActions";
import TableSkeleton from "../components/TableSkeleton";

import mahasiswaService from "../services/mahasiswaService";
import usePagination from "../hooks/usePagination";
import mahasiswaColumns from "../config/mahasiswaColumns";

import exportExcel from "../utils/exportExcel";
import exportPdf from "../utils/exportPdf";

function MahasiswaPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    data: mahasiswaData = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: mahasiswaService.getAll,
  });

  const mahasiswa = Array.isArray(mahasiswaData) ? mahasiswaData : [];

  const filteredMahasiswa = mahasiswa.filter((item) =>
    item.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedMahasiswa,
  } = usePagination(filteredMahasiswa, 5);

  const saveMutation = useMutation({
    mutationFn: (formData) => {
      if (selectedMahasiswa) {
        return mahasiswaService.update(
          selectedMahasiswa.id,
          formData
        );
      }

      return mahasiswaService.create(formData);
    },

    onSuccess: () => {
      showSuccess(
        selectedMahasiswa
          ? "Data mahasiswa berhasil diupdate."
          : "Data mahasiswa berhasil disimpan."
      );

      setSelectedMahasiswa(null);

      queryClient.invalidateQueries({
        queryKey: ["mahasiswa"],
      });
    },

    onError: () => {
      showError("Gagal menyimpan mahasiswa.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => mahasiswaService.remove(id),
    onSuccess: () => {
      toast.success("Data mahasiswa berhasil dihapus.");
      setShowConfirm(false);
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
    onError: () => {
      toast.error("Gagal menghapus mahasiswa.");
    },
  });

  const handleSubmit = (formData) => {
    saveMutation.mutate(formData);
  };

  const handleEdit = (item) => {
    setSelectedMahasiswa(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!deleteId) {
      toast.error("ID mahasiswa tidak ditemukan.");
      return;
    }

    deleteMutation.mutate(deleteId);
  };

  const handleDetail = (id) => {
    navigate(`/mahasiswa/${id}`);
  };

  return (
    <div>
      <h1>Data Mahasiswa</h1>

      <MahasiswaForm
        onSuccess={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />

      <hr />

      <SearchBox
        value={search}
        placeholder="Cari mahasiswa..."
        onChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      {isLoading && <TableSkeleton rows={5} columns={5} />}

      <ErrorAlert
        message={queryError ? "Gagal mengambil data mahasiswa." : ""}
      />

      {!isLoading && !queryError && (
        <>
          <div className="mb-3">
            <button
              className="btn btn-success me-2"
              onClick={() =>
                exportExcel(filteredMahasiswa, "data-mahasiswa.xlsx")
              }
            >
              Export Excel
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                exportPdf(
                  mahasiswaColumns,
                  filteredMahasiswa,
                  "data-mahasiswa.pdf",
                  "Data Mahasiswa"
                )
              }
            >
              Export PDF
            </button>
          </div>

          <DataTable
            columns={mahasiswaColumns}
            data={paginatedMahasiswa}
            actions={(item) => (
              <TableActions
                item={item}
                onDetail={handleDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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
        title="Hapus Mahasiswa"
        message="Yakin ingin menghapus data mahasiswa ini?"
        onCancel={() => {
          setShowConfirm(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default MahasiswaPage;