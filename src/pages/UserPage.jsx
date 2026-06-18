import { useState } from "react";
import { toast } from "react-toastify";

import UserForm from "../components/UserForm";
import DataTable from "../components/DataTable";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import ConfirmModal from "../components/ConfirmModal";

import userService from "../services/userService";
import userColumns from "../config/userColumns";

import useCrud from "../hooks/useCrud";
import usePagination from "../hooks/usePagination";

function UserPage() {
  const [search, setSearch] = useState("");

  const {
    items: users,
    loading,
    error,
    showConfirm,
    setShowConfirm,
    saveItem,
    askDelete,
    confirmDelete,
  } = useCrud(userService, "User");

  const filteredUsers = users.filter((item) =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  } = usePagination(filteredUsers, 10);

  const handleResetPassword = async (id) => {
    const password = prompt("Password baru:");

    if (!password) return;

    try {
      await userService.resetPassword(id, password);

      toast.success("Password berhasil direset");
    } catch (error) {
      toast.error("Gagal reset password");
      console.error(error);
    }
  };

  const handleChangeRole = async (id) => {
    const role = prompt(
      "Role baru (Super Admin / Admin / User)"
    );

    if (!role) return;

    try {
      await userService.updateRole(id, role);

      toast.success("Role berhasil diubah");
      window.location.reload();
    } catch (error) {
      toast.error("Gagal mengubah role");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <UserForm onSuccess={saveItem} />

      <SearchBox
        value={search}
        placeholder="Cari user..."
        onChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      {loading && (
        <LoadingSpinner text="Mengambil data user..." />
      )}

      <ErrorAlert message={error} />

      {!loading && !error && (
        <>
          <DataTable
            columns={userColumns}
            data={paginatedData}
            actions={(item) => (
              <>
                <button
                  className="btn btn-warning btn-sm me-1"
                  onClick={() =>
                    handleChangeRole(item.id)
                  }
                >
                  Role
                </button>

                <button
                  className="btn btn-info btn-sm me-1"
                  onClick={() =>
                    handleResetPassword(item.id)
                  }
                >
                  Reset
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    askDelete(item.id)
                  }
                >
                  Hapus
                </button>
              </>
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
        title="Hapus User"
        message="Yakin ingin menghapus user ini?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default UserPage;