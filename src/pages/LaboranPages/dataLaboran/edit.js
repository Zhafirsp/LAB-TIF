import React, { Component, useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
import { getDataUsersApi } from "../../../api/users/usersApi";
import {
  getLaboranByNIPApi,
  putLaboranApi,
} from "../../../api/laborans/laboransApi";

const EditLaboran = () => {
  const { nip } = useParams();
  const navigate = useNavigate();

  const [dataLaboran, setDataLaboran] = useState({});
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
      if (result?.status === 200) {
        const userLaboran = result?.data?.data?.filter(
          (item) => item?.role === "Laboran"
        );
        setUserList(userLaboran);
      } else {
        setUserList([]);
      }
    } catch (error) {
      console.log(error);
      setUserList([]);
    }
  };

  const getDetailLaboran = async () => {
    try {
      const result = await getLaboranByNIPApi(nip);
      if (result?.status === 200) {
        setDataLaboran(result?.data?.data);
      } else {
        setDataLaboran({});
      }
    } catch (error) {
      console.log(error);
      setDataLaboran({});
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await putLaboranApi(dataForm?.username, {
        nama_laboran: dataForm?.name,
      });
      if (result?.status === 200) {
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
    getDetailLaboran();
  }, []);

  useEffect(() => {
    if (nip) {
      setDataForm({
        username: dataLaboran?.nip,
        name: dataLaboran?.nama_laboran,
      });
    } else {
      setDataForm({
        username: "",
        name: "",
      });
    }
  }, [dataLaboran]);

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h4 className="fw-bold">Edit Laboran</h4>
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
                  disabled
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

export default EditLaboran;
