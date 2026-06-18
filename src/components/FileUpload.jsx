import { useState } from "react";
import uploadService from "../services/uploadService";
import { showSuccess, showError } from "../utils/notification";

function FileUpload({ onUploaded, multiple = false }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const maxSize = 5 * 1024 * 1024;

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  const validateFiles = (files) => {
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      if (!allowedTypes.includes(file.type)) {
        showError(`Format file ${file.name} tidak didukung.`);
        return false;
      }

      if (file.size > maxSize) {
        showError(`Ukuran file ${file.name} melebihi 5 MB.`);
        return false;
      }
    }

    return true;
  };

  const upload = async (files) => {
    if (!files || files.length === 0) return;

    if (!validateFiles(files)) return;

    try {
      setUploading(true);
      setProgress(0);

      if (multiple) {
        const result = await uploadService.uploadMultipleFiles(
          files,
          setProgress
        );

        const urls = result.data.map((item) => item.url);

        showSuccess("Semua file berhasil diupload.");
        onUploaded(urls);
      } else {
        const result = await uploadService.uploadFile(
          files[0],
          setProgress
        );

        showSuccess("File berhasil diupload.");
        onUploaded(result.data.url);
      }
    } catch (error) {
      showError("Gagal upload file.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    upload(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    upload(e.dataTransfer.files);
  };

  return (
    <div>
      <div
        className={`border rounded p-4 text-center ${
          dragActive ? "bg-light" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <p className="mb-2">
          Drag & drop file di sini, atau pilih file
        </p>

        <input
          type="file"
          multiple={multiple}
          accept=".pdf,.jpg,.jpeg,.png"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      {uploading && (
        <div className="progress mt-3">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;