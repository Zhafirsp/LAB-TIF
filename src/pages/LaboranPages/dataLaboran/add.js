import React, { Component, useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
import { getDataUsersApi } from "../../../api/users/usersApi";
import {
  getDataLaboransApi,
  postLaboranApi,
} from "../../../api/laborans/laboransApi";

const AddLaboran = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [userList, setUserList] = useState([]);

  const [dataForm, setDataForm] = useState({
    username: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const getUserLaboran = async () => {
    try {
      const result = await getDataUsersApi();
      const resultLaboran = await getDataLaboransApi();
      if (result?.status === 200) {
        const userLaboran = result?.data?.data?.filter(
          (item) => item?.role === "Laboran"
        );
        const laboranIds = resultLaboran?.data?.data?.map(
          (laboran) => laboran.user_id
        );
        const filteredUserLaboran = userLaboran.filter(
          (user) => !laboranIds.includes(user.user_id)
        );
        setUserList(filteredUserLaboran);
      } else {
        setUserList([]);
      }
    } catch (error) {
      console.log(error);
      setUserList([]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await postLaboranApi(dataForm?.username, {
        nama_laboran: dataForm?.name,
      });
      if (result?.status === 201) {
        setLoading(false);
        navigate("/data-laboran");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLaboran();
  }, []);

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
                <label className="form-label input" htmlFor="username">
                  Username
                </label>
                <select
                  className="form-select"
                  name="username"
                  aria-label="Default select example"
                  value={dataForm?.username}
                  onChange={handleChange}
                >
                  <option value="">Pilih...</option>
                  {userList?.map((data, index) => {
                    return (
                      <>
                        <option value={`${data?.username}`} key={index}>
                          {`${data?.username}`}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label input" htmlFor="name">
                  Nama
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.name}
                  type="text"
                  placeholder="Nama"
                  className="form-control"
                  id="name"
                  name="name"
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

export default AddLaboran;
