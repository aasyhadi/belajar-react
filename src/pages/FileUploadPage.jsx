import { useState } from "react";
import FileUpload from "../components/FileUpload";

const API_BASE_URL = "http://localhost:5127";

function FileUploadPage() {
  const [fileUrls, setFileUrls] = useState([]);

  const handleUploaded = (result) => {
    if (Array.isArray(result)) {
      setFileUrls(result);
      return;
    }

    setFileUrls([result]);
  };

  return (
    <div>
      <h1>Upload File</h1>

      <FileUpload
        multiple
        onUploaded={handleUploaded}
      />

      {fileUrls.length > 0 && (
        <div className="mt-4">
          <h5>Preview File</h5>

          {fileUrls.map((url, index) => {
            const fullUrl = `${API_BASE_URL}${url}`;
            const isPdf = url.toLowerCase().endsWith(".pdf");

            return (
              <div className="mb-4" key={index}>
                <h6>File {index + 1}</h6>

                {isPdf ? (
                  <iframe
                    title={`PDF Preview ${index}`}
                    src={fullUrl}
                    width="100%"
                    height="400"
                    className="border rounded"
                  />
                ) : (
                  <img
                    src={fullUrl}
                    alt={`Preview ${index}`}
                    className="img-fluid border rounded"
                  />
                )}

                <div className="mt-2">
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Buka File
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FileUploadPage;