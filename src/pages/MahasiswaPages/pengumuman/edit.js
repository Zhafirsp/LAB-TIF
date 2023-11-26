import React, { Component, useEffect, useState, useMemo } from "react";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPengumumanByIdApi,
  putPengumumanApi,
} from "../../../api/pengumuman/pengumumanApi";

const EditPengumuman = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState();
  const [status, setStatus] = useState(false);

  const getPengumumanById = async () => {
    try {
      const result = await getPengumumanByIdApi(id);
      if (result?.status === 200) {
        setData(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    // console.log(dataForm);
    const formData = new FormData();
    if (data?.judul !== judul) formData.append("judul", judul);
    if (file) formData.append("dokumen", file);
    formData.append("is_publish", status);

    // console.log("Konten FormData:", formData);
    setLoading(true);

    try {
      const result = await putPengumumanApi(id, formData);
      if (result?.status === 200) {
        setLoading(false);
        navigate("/pengumuman");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPengumumanById();
  }, []);

  useEffect(() => {
    if (id) {
      setJudul(data?.judul);
      setStatus(data?.is_publish);
    }
  }, [id, data]);

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h4 className="fw-bold">Edit Pengumuman</h4>
          </div>

          <div className="d-flex align-items-center flex-column">
            <div className="card p-4 mb-4" style={{ width: "50%" }}>
              <div className="mb-3">
                <label className="form-label input" htmlFor="name">
                  Judul
                </label>
                <input
                  onChange={(e) => setJudul(e?.target.value)}
                  value={judul}
                  type="text"
                  placeholder="Judul"
                  className="form-control"
                  id="name"
                  name="name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label input" htmlFor="dokumen">
                  File
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  //   value={file}
                  type="file"
                  //   placeholder="Judul"
                  className="form-control"
                  id="dokumen"
                  name="dokumen"
                />
              </div>
              <div className="mb-3">
                <label className="form-label input" htmlFor="status">
                  Status
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={status}
                  // onChange={(e) => setRole(e.target?.value)}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={true}>Aktif</option>
                  <option value={false}>Tidak Aktif</option>
                </select>
              </div>
            </div>
            <button onClick={handleSubmit} className="btn btn-success">
              {loading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default EditPengumuman;
