function TableActions({
  item,
  onDetail,
  onEdit,
  onDelete
}) {
  return (
    <>
      <button
        className="btn btn-info btn-sm me-1"
        onClick={() => onDetail(item.id)}
      >
        Detail
      </button>

      <button
        className="btn btn-warning btn-sm me-1"
        onClick={() => onEdit(item)}
      >
        Edit
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(item.id)}
      >
        Hapus
      </button>
    </>
  );
}

export default TableActions;