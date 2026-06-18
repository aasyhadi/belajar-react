import api from "./api";

const getAll = async () => {
  const response = await api.get("/krs");
  return response.data.data ?? response.data;
};

const create = async (data) => {
  const response = await api.post("/krs", data);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/krs/${id}`);
  return response.data.data;
};

export default {
  getAll,
  create,
  remove,
};