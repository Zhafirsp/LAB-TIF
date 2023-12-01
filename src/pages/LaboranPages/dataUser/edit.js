import React, { Component, useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
import ProfileImage from "../../../assets/images/profile.png";
import { getDataUserByIdApi, putUserApi } from "../../../api/users/usersApi";
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

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

  const handleChangeFile = (e) => {
    const image = e?.target?.files[0];
    setFile(image);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const getDetailUser = async () => {
    try {
      const result = await getDataUserByIdApi(id);
      if (result?.status === 200) {
        setDataUser(result?.data?.data);
      } else {
        setDataUser({});
      }
    } catch (error) {
      console.log(error);
      setDataUser({});
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append("email", dataForm.email);
    formdata.append("no_hp", dataForm.no_hp);
    formdata.append("image_url", file);
    try {
      const result = await putUserApi(id, formdata);
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

  let displayImage = dataUser?.image_url || ProfileImage;

  if (file) {
    displayImage = previewImage;
  }

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
                  src={displayImage}
                  alt="Profile "
                  style={{ width: "180px" }}
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={handleChangeFile}

                  type="file"
                  accept="image/*"
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
