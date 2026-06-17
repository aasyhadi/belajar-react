import api from "./api";

const getAll = async () => {
  const response = await api.get("/audit-logs");
  return response.data.data ?? response.data;
};

export default {
  getAll,
};