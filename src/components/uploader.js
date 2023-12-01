import React, { useState, useEffect } from "react";
import GoogleDrivePicker from "./GoogleDrivePicker";
import {
  postPendaftaranApi,
  deletePendaftaranApi,
} from "../api/pendaftaran/pendaftaranApi";
import { getDataProgramApi } from "../api/programs/programApi";
import ModalConfirm from "./modal/ModalConfirm";

export default function Uploader() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [listProgram, setListProgram] = useState([]);
  const [program, setProgram] = useState();

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const getDataPrograms = async () => {
    try {
      const result = await getDataProgramApi();
      setListProgram(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file_syarat", file?.data);

    setLoading(true);
    try {
      const result = await postPendaftaranApi(program, formData);

      const responseWithBody = await result.json();
      if (result) setUrl(responseWithBody.publicUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const result = await deletePendaftaranApi(program);
      if (result?.status === 200) {
        setOpenModalConfirm(false);
        setLoadingDelete(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(file);
  };

  useEffect(() => {
    getDataPrograms();
  }, []);

  return (
    <>
      <ModalConfirm
        show={openModalConfirm}
        handleClose={() => setOpenModalConfirm(false)}
        title="Hapus File"
        message="Apakah anda yakin menghapus data ini?"
        loading={loadingDelete}
        handleSubmit={handleDelete}
      />
      <label htmlFor="formFile" className="form-label fw-bold">
        Lengkapi Dokumen (Wajib)
      </label>
      <div className="mb-3">
        <select
          className="form-select"
          name="username"
          aria-label="Default select example"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        >
          <option value="">Pilih Program...</option>
          {listProgram?.map((data, index) => {
            return (
              <>
                <option value={`${data?.program_id}`} key={index}>
                  {`${data?.judul}`}
                </option>
              </>
            );
          })}
        </select>
      </div>
      <p htmlFor="formFile" className="form-label text-muted">
        Unggah file dalam format zip dengan ukuran maksimal 10MB
      </p>

      <form className="mb-3" onSubmit={handleSubmit}>
        <GoogleDrivePicker />
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          accept=".zip"
          name="file_syarat"
          onChange={(e) => {
            handleFileChange(e);
          }}
        />

        <div>
          <button
            className="btn btn-primary col-3 mt-4 float-end"
            style={{
              backgroundColor: "red",
              borderColor: "red",
            }}
            onClick={() => {
              setOpenModalConfirm(true);
            }}
          >
            Hapus File
          </button>
          <button
            className="btn btn-primary col-3 mt-4 float-end"
            style={{
              marginRight: "12px",
            }}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
