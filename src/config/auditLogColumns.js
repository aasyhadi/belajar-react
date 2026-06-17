const auditLogColumns = [
  {
    key: "userEmail",
    label: "User Email",
  },
  {
    key: "action",
    label: "Aksi",
  },
  {
    key: "entityName",
    label: "Entity",
  },
  {
    key: "description",
    label: "Deskripsi",
  },
  {
    key: "createdAt",
    label: "Tanggal",
    render: (item) =>
      item.createdAt
        ? new Date(item.createdAt).toLocaleString("id-ID")
        : "-",
  },
];

export default auditLogColumns;