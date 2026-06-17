import api from "./api";

const getAll = async () => {
  const response = await api.get("/mahasiswa");
  return response.data.data ?? response.data;
};

const create = async (mahasiswa) => {
  const payload = {
    nama: mahasiswa.nama,
    jurusan: mahasiswa.jurusan,
  };

  const response = await api.post("/mahasiswa", payload);
  return response.data;
};

const update = async (id, mahasiswa) => {
  const payload = {
    nama: mahasiswa.nama,
    jurusan: mahasiswa.jurusan,
  };

  const response = await api.put(`/mahasiswa/${id}`, payload);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/mahasiswa/${id}`);
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/mahasiswa/${id}`);
  return response.data.data ?? response.data;
};

const addMataKuliah = async (mahasiswaId, mataKuliahId) => {
  const response = await api.post(
    `/mahasiswa/${mahasiswaId}/matakuliah/${mataKuliahId}`
  );

  return response.data;
};

const getMataKuliahByMahasiswa = async (id) => {
  const response = await api.get(
    `/mahasiswa/${id}/matakuliah`
  );

  return response.data.data;
};

export default {
  getAll,
  getById,
  getMataKuliahByMahasiswa,
  create,
  update,
  remove,
  addMataKuliah,
};