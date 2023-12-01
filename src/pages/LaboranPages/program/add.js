import React, { Component, useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { postProgramApi } from "../../../api/programs/programApi";

const AddProgram = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [dataForm, setDataForm] = useState({
    periode: "",
    judul: "",
    deskripsi: "",
    batas_waktu: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await postProgramApi(dataForm);
      if (result?.status === 201) {
        setLoading(false);
        navigate("/program");
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
            <h4 className="fw-bold">Tambah Laboran</h4>
          </div>

          <div className="d-flex align-items-center flex-column">
            <div className="card p-4 mb-4" style={{ width: "50%" }}>
              <div className="mb-3">
                <label className="form-label input" htmlFor="periode">
                  Periode
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.periode}
                  type="text"
                  placeholder="Periode"
                  className="form-control"
                  id="periode"
                  name="periode"
                />
              </div>

              <div className="mb-3">
                <label className="form-label input" htmlFor="judul">
                  Judul
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.judul}
                  type="text"
                  placeholder="Judul"
                  className="form-control"
                  id="judul"
                  name="judul"
                />
              </div>
              <div className="mb-3">
                <label className="form-label input" htmlFor="deskripsi">
                  Deskripsi
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.deskripsi}
                  type="text"
                  placeholder="Deskripsi"
                  className="form-control"
                  id="deskripsi"
                  name="deskripsi"
                />
              </div>
              <div className="mb-3">
                <label className="form-label input" htmlFor="batas_waktu">
                  Batas Waktu
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.batas_waktu}
                  type="date"
                  placeholder="Batas Waktu"
                  className="form-control"
                  id="batas_waktu"
                  name="batas_waktu"
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

export default AddProgram;
