import { useEffect, useState } from "react";

function MahasiswaForm({ onSuccess, selectedMahasiswa }) {

    useEffect(() => {
    if (selectedMahasiswa) {
        setForm({
        nama: selectedMahasiswa.nama ?? "",
        nim: selectedMahasiswa.nim ?? "",
        jurusan: selectedMahasiswa.jurusan ?? "",
        email: selectedMahasiswa.email ?? "",
        });
    }
    }, [selectedMahasiswa]);

  const [form, setForm] = useState({
    nama: "",
    nim: "",
    jurusan: "",
    email: "",
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
      nim: "",
      jurusan: "",
      email: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h2>{selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}</h2>

      <div>
        <label>Nama</label>
        <br />
        <input
          className="form-control"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>NIM</label>
        <br />
        <input
          className="form-control"
          name="nim"
          value={form.nim}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Jurusan</label>
        <br />
        <input
          className="form-control"
          name="jurusan"
          value={form.jurusan}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <br />
        <input
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <br />

      <button className="btn btn-primary" type="submit">
        {selectedMahasiswa ? "Update" : "Simpan"}
      </button>
    </form>
  );
}

export default MahasiswaForm;