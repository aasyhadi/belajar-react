import api from "./api";

const getAll = async () => {
  const response = await api.get("/matakuliah");
  return response.data.data ?? response.data;
};

const create = async (data) => {
  const payload = {
    namaMataKuliah: data.nama,
    sks: Number(data.sks),
    mahasiswaId: Number(data.mahasiswaId),
  };

  const response = await api.post("/matakuliah", payload);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/matakuliah/${id}`);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
};