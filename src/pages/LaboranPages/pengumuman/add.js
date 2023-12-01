import React, { Component, useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
import { postPengumumanApi } from "../../../api/pengumuman/pengumumanApi";

const AddPengumuman = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("dokumen", file);

    setLoading(true);

    try {
      const result = await postPengumumanApi(formData);
      if (result?.status === 201) {
        setLoading(false);
        navigate("/pengumuman");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h4 className="fw-bold">Tambah Pengumuman</h4>
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

export default AddPengumuman;