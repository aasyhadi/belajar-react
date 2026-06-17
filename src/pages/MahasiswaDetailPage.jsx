import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import mahasiswaService from "../services/mahasiswaService";
import mataKuliahService from "../services/mataKuliahService";

function MahasiswaDetailPage() {
  const { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [selectedMataKuliahId, setSelectedMataKuliahId] = useState("");
  const [mataKuliah, setMataKuliah] = useState([]);

  useEffect(() => {
    loadDetail();
    loadMataKuliah();
  }, [id]);

  const loadDetail = async () => {
    try {
      const data = await mahasiswaService.getAll();

      const selected = data.find(
        (item) => String(item.id) === String(id)
      );

      setMahasiswa(selected);
    } catch (error) {
      alert("Gagal mengambil detail mahasiswa.");
      console.error(error);
    }
  };

  const loadMataKuliah = async () => {
    try {
      const data =
        await mahasiswaService.getMataKuliahByMahasiswa(id);

      setMataKuliah(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMataKuliah = async (e) => {
    e.preventDefault();

    if (!selectedMataKuliahId) {
      alert("Pilih mata kuliah terlebih dahulu.");
      return;
    }

    try {
      await mahasiswaService.addMataKuliah(id, selectedMataKuliahId);
      setSelectedMataKuliahId("");
      await loadDetail();
    } catch (error) {
      alert("Gagal menambahkan mata kuliah.");
      console.error(error);
    }
  };


  if (!mahasiswa) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Detail Mahasiswa</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h4>{mahasiswa.nama}</h4>
          <p>Jurusan: {mahasiswa.jurusan}</p>
        </div>
      </div>

      

      <h3>Mata Kuliah</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Mata Kuliah</th>
            <th>SKS</th>
          </tr>
        </thead>

        <tbody>
          {mataKuliah.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.namaMataKuliah}</td>
              <td>{item.sks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link className="btn btn-secondary" to="/mahasiswa">
        Kembali
      </Link>
    </>
  );
}

export default MahasiswaDetailPage;