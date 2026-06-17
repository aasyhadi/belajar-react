import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportExcel = (data, fileName = "data.xlsx") => {
  const rows = Array.isArray(data) ? data : [];

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, fileName);
};

export default exportExcel;