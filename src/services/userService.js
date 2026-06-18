import api from "./api";

const getAll = async () => {
  const response = await api.get("/users");
  return response.data.data ?? response.data;
};

const create = async (data) => {
  const response = await api.post("/users", data);
  return response.data;
};

const updateRole = async (id, role) => {
  const response = await api.put(`/users/${id}/role`, { role });
  return response.data;
};

const resetPassword = async (id, newPassword) => {
  const response = await api.put(`/users/${id}/reset-password`, {
    newPassword,
  });

  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default {
  getAll,
  create,
  updateRole,
  resetPassword,
  remove,
};