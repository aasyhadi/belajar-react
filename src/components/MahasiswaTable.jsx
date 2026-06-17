<DataTable
  columns={columns}
  data={paginatedMahasiswa}
  actions={(item) => (
    <>
      <button
        className="btn btn-info btn-sm me-1"
        onClick={() => handleDetail(item.id)}
      >
        Detail
      </button>

      <button
        className="btn btn-warning btn-sm me-1"
        onClick={() => handleEdit(item)}
      >
        Edit
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(item.id)}
      >
        Hapus
      </button>
    </>
  )}
/>
