import React, { Component, useEffect, useState, useMemo } from "react";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
// import NavLink from "react-bootstrap/esm/NavLink";
// import { PiPencilSimpleBold } from "react-icons/pi";
// import { BiTrashAlt } from "react-icons/bi";

import {
  getAsistenByIdApi,
  putAsistenApi,
} from "../../../api/asistens/asistensApi";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../../context/AuthContext";
// import * as IoIcons from "react-icons/io";

const EditAsisten = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataAsisten, setDataAsisten] = useState({});
  const [loading, setLoading] = useState(false);

  const [dataForm, setDataForm] = useState({
    golongan: "",
    is_active: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const getDetailAsisten = async () => {
    // setLoading(true);
    try {
      const result = await getAsistenByIdApi(id);
      if (result?.status === 200) {
        // setLoading(false);
        setDataAsisten(result?.data?.data);
        // console.log(result?.data?.data);
      } else {
        // setLoading(false);
        setDataAsisten({});
      }
    } catch (error) {
      console.log(error);
      //   setLoading(false);
      setDataAsisten({});
    }
  };

  const handleSubmit = async () => {
    // console.log(dataForm);
    setLoading(true);

    try {
      const result = await putAsistenApi(id, {
        golongan: dataForm?.golongan,
      });
      if (result?.status === 200) {
        setLoading(false);
        navigate("/data-asisten");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailAsisten();
  }, []);

  useEffect(() => {
    if (id) {
      setDataForm({
        golongan: dataAsisten?.golongan,
        is_active: dataAsisten?.is_active,
      });
    } else {
      setDataForm({
        golongan: "",
        is_active: false,
      });
    }
  }, [dataAsisten]);

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h4 className="fw-bold">Edit Asisten</h4>
          </div>

          <div className="d-flex align-items-center flex-column">
            <div className="card p-4 mb-4" style={{ width: "50%" }}>
              <div className="mb-3">
                <label className="form-label input" htmlFor="username">
                  Golongan
                </label>
                <select
                  className="form-select"
                  name="golongan"
                  aria-label="Default select example"
                  value={dataForm?.golongan}
                  onChange={handleChange}
                >
                  <option value="">Pilih...</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="C">D</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label input" htmlFor="name">
                  Status
                </label>
                <select
                  className="form-select"
                  name="is_active"
                  aria-label="Default select example"
                  value={dataForm?.is_active}
                  onChange={handleChange}
                  disabled
                >
                  <option value="">Pilih...</option>
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

export default EditAsisten;
