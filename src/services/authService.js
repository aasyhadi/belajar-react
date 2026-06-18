import api from "./api";

const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.data.token);
  localStorage.setItem("refreshToken", response.data.data.refreshToken);
  localStorage.setItem("userName", response.data.data.name);
  localStorage.setItem("role", response.data.data.role);

  return response.data;
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await api.post("/auth/refresh", {
    refreshToken,
  });

  localStorage.setItem("token", response.data.data.token);
  localStorage.setItem("refreshToken", response.data.data.refreshToken);

  return response.data.data.token;
};

export default {
  login,
  refreshToken,
};
