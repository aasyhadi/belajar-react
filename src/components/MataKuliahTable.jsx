function MataKuliahTable({ mataKuliah, onDelete }) {
  const data = Array.isArray(mataKuliah) ? mataKuliah : [];

  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Mata Kuliah</th>
          <th>SKS</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.namaMataKuliah ?? item.nama}</td>
            <td>{item.sks}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(item.id)}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MataKuliahTable;