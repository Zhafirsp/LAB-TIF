import React, { Component, useEffect, useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import {
  getDataUsersApi,
  getSevimaDataUsersApi,
  deleteUserApi,
} from "../../../api/users/usersApi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import ModalConfirm from "../../../components/modal/ModalConfirm";
import * as IoIcons from "react-icons/io";

const UserList = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { authTokens } = useAuth();

  const [selectedId, setSelectedId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);


  const getSevimaDataUsers = async () => {
    setLoading(false);
    try {
      const result = await getSevimaDataUsersApi({ periode: "20221" });
      setUsers(result?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataUsers = async () => {
    try {
      const result = await getDataUsersApi({});
      setUsers(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const result = await deleteUserApi(selectedId);
      if (result?.status === 200) {
        setOpenModalConfirm(false);
        setLoadingDelete(false);
        getDataUsers();
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    getDataUsers();
    getSevimaDataUsers();
  }, []);

  const handleSort = (key) => {
    if (key === sortBy) {
      // Jika kolom yang sama diklik, balik arah penyortiran
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Jika kolom berbeda diklik, atur kolom yang akan diurutkan
      setSortBy(key);
      setSortOrder("asc");
    }

    // Lakukan penyortiran data di sini
    const sortedData = [...users].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] < b[key] ? -1 : 1;
      } else {
        return a[key] > b[key] ? -1 : 1;
      }
    });
    setUsers(sortedData);
  };

  return (
    <>
      <ModalConfirm
        show={openModalConfirm}
        handleClose={() => setOpenModalConfirm(false)}
        title="Hapus User"
        message="Apakah anda yakin menghapus data user ini?"
        loading={loadingDelete}
        handleSubmit={handleDelete}
      />
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h2 className="fw-bold">Daftar User</h2>
            <hr />
            <div className="subtitle">LAB TIF</div>
          </div>
          <button
            type="button"
            onClick={() => getSevimaDataUsers()}
            className="btn btn-warning col-4 mx-auto mb-2 text-white"
            id="submit"
          >
            {loading ? "Loading..." : "Update Data"}
          </button>
          <table
            className="table table-bordered text-center"
            style={{
              backgroundColor: "#063554",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <thead>
              <tr>
                <th className="text-center" colSpan={"7"}>
                  <h3 className="fw-bold">Daftar User</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Foto</th>
                <th scope="col">
                  Username
                  <IoIcons.IoMdArrowDropdown
                    onClick={() => handleSort("username")}
                  />
                </th>
                <th scope="col">
                  Role
                  <IoIcons.IoMdArrowDropdown
                    onClick={() => handleSort("role")}
                  />
                </th>
                <th scope="col">
                  Email
                  <IoIcons.IoMdArrowDropdown
                    onClick={() => handleSort("email")}
                  />
                </th>
                <th scope="col">No Hp</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody
              style={{
                backgroundColor: "#fff",
                color: "black",
                borderRadius: "10px",
              }}
            >
              {authTokens ? (
                users &&
                users.map((user, index) => (
                  <tr key={user.user_id}>
                    <td>{index + 1}</td>
                    <td>{user.img_url}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.no_hp}</td>
                    <td>
                      <Link
                        to={`edit-user/${user.user_id}`}
                        className="btn btn-warning mx-2 text-white"
                      >
                        <PiPencilSimpleBold />
                      </Link>
                      <button
                        onClick={() => {
                          setOpenModalConfirm(true);
                          setSelectedId(user?.user_id);
                        }}
                        className="btn btn-danger"
                      >
                        <BiTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No users to display</p>
              )}
            </tbody>
          </table>
          <NavLink
            href="/register"
            className="btn btn-primary col-md-4 offset-md-8 mt-4"
            id="btn-user"
          >
            Tambah User
          </NavLink>
        </Container>
      </section>
    </>
  );
};

export default UserList;
