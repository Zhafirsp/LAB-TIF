import React, { Component, useEffect, useState, useMemo } from "react";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
// import NavLink from "react-bootstrap/esm/NavLink";
// import { PiPencilSimpleBold } from "react-icons/pi";
// import { BiTrashAlt } from "react-icons/bi";
import { postProgramApi } from "../../../api/programs/programApi";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../../context/AuthContext";
// import * as IoIcons from "react-icons/io";

const AddProgram = () => {
  //   const { id } = useParams();
  const navigate = useNavigate();

  //   const [dataUser, setDataUser] = useState({});
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

  //   const getDetailUser = async () => {
  //     // setLoading(true);
  //     try {
  //       const result = await getDataUserByIdApi(id);
  //       if (result?.status === 200) {
  //         // setLoading(false);
  //         setDataUser(result?.data?.data);
  //         // console.log(result?.data?.data);
  //       } else {
  //         // setLoading(false);
  //         setDataUser({});
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       //   setLoading(false);
  //       setDataUser({});
  //     }
  //   };

  const handleSubmit = async () => {
    // console.log(dataForm);
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

  //   useEffect(() => {
  //     if (id) {
  //       setDataForm({
  //         email: dataUser?.email,
  //         no_hp: dataUser?.no_hp,
  //       });
  //     } else {
  //       setDataForm({
  //         email: "",
  //         no_hp: null,
  //       });
  //     }
  //   }, [dataUser]);

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
