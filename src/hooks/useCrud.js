import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "./useApi";

function useCrud(service, entityName = "Data") {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { loading, error, execute } = useApi();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await execute(() => service.getAll());
    setItems(Array.isArray(data) ? data : []);
  };

  const saveItem = async (formData) => {
    try {
      if (selectedItem) {
        if (!service.update) {
          toast.error(`Fitur update ${entityName} belum tersedia.`);
          return;
        }

        await service.update(selectedItem.id, formData);
        toast.success(`${entityName} berhasil diupdate.`);
        setSelectedItem(null);
      } else {
        await service.create(formData);
        toast.success(`${entityName} berhasil disimpan.`);
      }

      await loadItems();
    } catch (error) {
      toast.error(`Gagal menyimpan ${entityName}.`);
      console.error(error);
    }
  };

  const editItem = (item) => {
    setSelectedItem(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const askDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) {
      toast.error(`ID ${entityName} tidak ditemukan.`);
      return;
    }

    try {
      await service.remove(deleteId);
      toast.success(`${entityName} berhasil dihapus.`);
      await loadItems();
    } catch (error) {
      toast.error(`Gagal menghapus ${entityName}.`);
      console.error(error);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  return {
    items,
    selectedItem,
    setSelectedItem,

    loading,
    error,

    showConfirm,
    setShowConfirm,
    deleteId,
    setDeleteId,

    loadItems,
    saveItem,
    editItem,
    askDelete,
    confirmDelete,
  };
}

export default useCrud;