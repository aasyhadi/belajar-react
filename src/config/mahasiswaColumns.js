const mahasiswaColumns = [
  {
    key: "nama",
    label: "Nama",
  },
  {
    key: "nim",
    label: "NIM",
    render: (item) => item.nim ?? "-",
  },
  {
    key: "jurusan",
    label: "Jurusan",
  },
  {
    key: "email",
    label: "Email",
    render: (item) => item.email ?? "-",
  },
];

export default mahasiswaColumns;