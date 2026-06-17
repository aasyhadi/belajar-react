const mataKuliahColumns = [
  {
    key: "namaMataKuliah",
    label: "Nama Mata Kuliah",
    render: (item) => item.namaMataKuliah ?? item.nama ?? "-",
  },
  {
    key: "sks",
    label: "SKS",
  },
];

export default mataKuliahColumns;