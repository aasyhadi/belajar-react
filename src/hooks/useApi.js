import { useState } from "react";

function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const execute = async (callback) => {
    try {
      setLoading(true);
      setError("");

      const result = await callback();

      return result;
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    execute,
  };
}

export default useApi;