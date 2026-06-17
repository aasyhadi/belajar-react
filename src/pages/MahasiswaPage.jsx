import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MahasiswaForm from "../components/MahasiswaForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import ConfirmModal from "../components/ConfirmModal";
import DataTable from "../components/DataTable";
import TableActions from "../components/TableActions";

import mahasiswaService from "../services/mahasiswaService";
import useApi from "../hooks/useApi";
import usePagination from "../hooks/usePagination";

import mahasiswaColumns from "../config/mahasiswaColumns";

import exportExcel from "../utils/exportExcel";
import exportPdf from "../utils/exportPdf";

function MahasiswaPage() {
  const navigate = useNavigate();

  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  const [search, setSearch] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { loading, error, execute } = useApi();

  useEffect(() => {
    loadMahasiswa();
  }, []);

  const loadMahasiswa = async () => {
    const data = await execute(() => mahasiswaService.getAll());
    setMahasiswa(Array.isArray(data) ? data : []);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedMahasiswa) {
        await mahasiswaService.update(selectedMahasiswa.id, formData);
        toast.success("Data mahasiswa berhasil diupdate.");
        setSelectedMahasiswa(null);
      } else {
        await mahasiswaService.create(formData);
        toast.success("Data mahasiswa berhasil disimpan.");
      }

      await loadMahasiswa();
    } catch (error) {
      toast.error("Gagal menyimpan mahasiswa.");
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setSelectedMahasiswa(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) {
      toast.error("ID mahasiswa tidak ditemukan.");
      return;
    }

    try {
      await mahasiswaService.remove(deleteId);
      toast.success("Data mahasiswa berhasil dihapus.");
      await loadMahasiswa();
    } catch (error) {
      toast.error("Gagal menghapus mahasiswa.");
      console.error(error);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const handleDetail = (id) => {
    navigate(`/mahasiswa/${id}`);
  };

  const filteredMahasiswa = mahasiswa.filter((item) =>
    item.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedMahasiswa,
  } = usePagination(filteredMahasiswa, 5);

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

      {loading && <LoadingSpinner text="Mengambil data mahasiswa..." />}

      <ErrorAlert message={error} />

      {!loading && !error && (
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