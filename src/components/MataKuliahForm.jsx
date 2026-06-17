import { useState } from "react";

function MataKuliahForm({ onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    sks: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSuccess(form);

    setForm({
      nama: "",
      sks: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h2>Tambah Mata Kuliah</h2>

      <div className="mb-3">
        <label>Nama Mata Kuliah</label>
        <input
          className="form-control"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>SKS</label>
        <input
          className="form-control"
          name="sks"
          type="number"
          min="2"
          value={form.sks}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Simpan
      </button>
    </form>
  );
}

export default MataKuliahForm;