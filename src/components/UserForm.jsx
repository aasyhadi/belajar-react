import { useState } from "react";

function UserForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
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
      name: "",
      email: "",
      password: "",
      role: "User",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h2>Tambah User</h2>

      <div className="mb-3">
        <label>Nama</label>
        <input
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          className="form-control"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Role</label>
        <select
          className="form-select"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="Super Admin">Super Admin</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      <button className="btn btn-primary" type="submit">
        Simpan
      </button>
    </form>
  );
}

export default UserForm;