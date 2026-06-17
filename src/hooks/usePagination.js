import { useState } from "react";

function usePagination(data, pageSize = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    data.length / pageSize
  );

  const startIndex =
    (currentPage - 1) * pageSize;

  const paginatedData = data.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  };
}

export default usePagination;