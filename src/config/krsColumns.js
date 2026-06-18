const krsColumns = [
  {
    key: "namaMahasiswa",
    label: "Mahasiswa",
  },
  {
    key: "namaMataKuliah",
    label: "Mata Kuliah",
  },
  {
    key: "sks",
    label: "SKS",
  },
  {
    key: "tanggalAmbil",
    label: "Tanggal Ambil",
    render: (item) =>
      item.tanggalAmbil
        ? new Date(item.tanggalAmbil).toLocaleString("id-ID")
        : "-",
  },
];

export default krsColumns;