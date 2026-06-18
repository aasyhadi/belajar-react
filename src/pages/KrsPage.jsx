import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import DataTable from "../components/DataTable";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import ErrorAlert from "../components/ErrorAlert";
import TableSkeleton from "../components/TableSkeleton";

import krsService from "../services/krsService";
import mahasiswaService from "../services/mahasiswaService";
import mataKuliahService from "../services/mataKuliahService";

import krsColumns from "../config/krsColumns";
import usePagination from "../hooks/usePagination";

import exportExcel from "../utils/exportExcel";
import exportPdf from "../utils/exportPdf";
import { showSuccess, showError } from "../utils/notification";

function KrsPage() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    mahasiswaId: "",
    mataKuliahId: "",
  });

  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    data: krsData = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["krs"],
    queryFn: krsService.getAll,
  });

  const { data: mahasiswaData = [] } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: mahasiswaService.getAll,
  });

  const { data: mataKuliahData = [] } = useQuery({
    queryKey: ["mataKuliah"],
    queryFn: mataKuliahService.getAll,
  });

  const filteredKrs = krsData.filter((item) =>
    JSON.stringify(item ?? {})
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  } = usePagination(filteredKrs, 10);

  const createMutation = useMutation({
    mutationFn: krsService.create,
    onSuccess: () => {
      showSuccess("KRS berhasil ditambahkan.");
      setForm({
        mahasiswaId: "",
        mataKuliahId: "",
      });
      queryClient.invalidateQueries({ queryKey: ["krs"] });
    },
    onError: () => {
      showError("Gagal menambahkan KRS.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: krsService.remove,
    onSuccess: () => {
      showSuccess("KRS berhasil dihapus.");
      setShowConfirm(false);
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["krs"] });
    },
    onError: () => {
      showError("Gagal menghapus KRS.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createMutation.mutate({
      mahasiswaId: Number(form.mahasiswaId),
      mataKuliahId: Number(form.mataKuliahId),
    });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!deleteId) {
      showError("ID KRS tidak ditemukan.");
      return;
    }

    deleteMutation.mutate(deleteId);
  };

  return (
    <div>
      <h1>Data KRS</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <h3>Tambah KRS</h3>

        <div className="mb-3">
          <label>Mahasiswa</label>
          <select
            className="form-select"
            value={form.mahasiswaId}
            onChange={(e) =>
              setForm({
                ...form,
                mahasiswaId: e.target.value,
              })
            }
            required
          >
            <option value="">-- Pilih Mahasiswa --</option>
            {mahasiswaData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Mata Kuliah</label>
          <select
            className="form-select"
            value={form.mataKuliahId}
            onChange={(e) =>
              setForm({
                ...form,
                mataKuliahId: e.target.value,
              })
            }
            required
          >
            <option value="">-- Pilih Mata Kuliah --</option>
            {mataKuliahData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.namaMataKuliah} ({item.sks} SKS)
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Tambah KRS
        </button>
      </form>

      <SearchBox
        value={search}
        placeholder="Cari KRS..."
        onChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      <ErrorAlert message={queryError ? "Gagal mengambil data KRS." : ""} />

      {isLoading && <TableSkeleton rows={5} columns={4} />}

      {!isLoading && !queryError && (
        <>
          <div className="mb-3">
            <button
              className="btn btn-success me-2"
              onClick={() => exportExcel(filteredKrs, "data-krs.xlsx")}
            >
              Export Excel
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                exportPdf(krsColumns, filteredKrs, "data-krs.pdf", "Data KRS")
              }
            >
              Export PDF
            </button>
          </div>

          <DataTable
            columns={krsColumns}
            data={paginatedData}
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
        title="Hapus KRS"
        message="Yakin ingin menghapus KRS ini?"
        onCancel={() => {
          setShowConfirm(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default KrsPage;