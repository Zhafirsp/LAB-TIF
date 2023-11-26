import React, { Component, useEffect, useState, useMemo } from "react";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
// import NavLink from "react-bootstrap/esm/NavLink";
// import { PiPencilSimpleBold } from "react-icons/pi";
// import { BiTrashAlt } from "react-icons/bi";
import ProfileImage from "../../../assets/images/profile.png";
import { getDataUserByIdApi, putUserApi } from "../../../api/users/usersApi";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../../context/AuthContext";
// import * as IoIcons from "react-icons/io";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(false);

  const [dataForm, setDataForm] = useState({
    email: "",
    no_hp: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const getDetailUser = async () => {
    // setLoading(true);
    try {
      const result = await getDataUserByIdApi(id);
      if (result?.status === 200) {
        // setLoading(false);
        setDataUser(result?.data?.data);
        // console.log(result?.data?.data);
      } else {
        // setLoading(false);
        setDataUser({});
      }
    } catch (error) {
      console.log(error);
      //   setLoading(false);
      setDataUser({});
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formdata = new FormData();
    // formdata.append("username", dataForm.username);
    formdata.append("email", dataForm.email);
    formdata.append("no_hp", dataForm.no_hp);
    try {
      const result = await putUserApi(id, dataForm);
      if (result?.status === 200) {
        setLoading(false);
        navigate("/data-user");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailUser();
  }, []);

  useEffect(() => {
    if (id) {
      setDataForm({
        email: dataUser?.email,
        no_hp: dataUser?.no_hp,
      });
    } else {
      setDataForm({
        email: "",
        no_hp: null,
      });
    }
  }, [dataUser]);

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h4 className="fw-bold">Edit User</h4>
          </div>

          <div className="d-flex align-items-center flex-column">
            <div className="card p-4 mb-4" style={{ width: "50%" }}>
              <p className="fs-6 fw-bold">Foto Profile</p>
              <div className="d-flex justify-content-center mb-4">
                <img
                  src={ProfileImage}
                  alt="Profile "
                  style={{ width: "180px" }}
                />
              </div>
              <div className="mb-3">
                {/* <label className="form-label input" htmlFor="profile=photo">
                  
                </label> */}
                <input
                  //   value={formData?.username}
                  // onChange={(e) => setUsername(e.target?.value)}
                  //   onChange={(e) =>
                  //     setData({ ...data, username: e.target.value })
                  //   }
                  type="file"
                  //   placeholder="NIP/NPM"
                  className="form-control"
                  id="profile-photo"
                  name="profile-photo"
                />
              </div>
              <div className="mb-3">
                <label className="form-label input" htmlFor="username">
                  Username
                </label>
                <input
                  //   onChange={handleChange}
                  value={dataUser?.username}
                  type="username"
                  placeholder="Nama"
                  className="form-control"
                  id="username"
                  name="username"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label input" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.email}
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label input" htmlFor="no_hp">
                  No. Handphone
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.no_hp}
                  type="text"
                  placeholder="No. Handphone"
                  className="form-control"
                  id="no_hp"
                  name="no_hp"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              //   onClick={(e) => deleteUser(user.id)}
              className="btn btn-success"
            >
              {loading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default EditUser;
