import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPdf = (columns, data, fileName = "data.pdf", title = "Data") => {
  const doc = new jsPDF();

  doc.text(title, 14, 15);

  const tableColumns = columns.map((col) => col.label);

  const tableRows = data.map((item) =>
    columns.map((col) => {
      if (col.render) {
        return col.render(item);
      }

      return item[col.key] ?? "-";
    })
  );

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: 25,
  });

  doc.save(fileName);
};

export default exportPdf;