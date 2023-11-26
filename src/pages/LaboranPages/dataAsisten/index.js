import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  getDataAsistensApi,
  deleteAsistenApi,
} from "../../../api/asistens/asistensApi";
import * as IoIcons from "react-icons/io";
import ModalConfirm from "../../../components/modal/ModalConfirm";

export default function DataAsisten() {
  const [asistens, setAsistens] = useState();
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedData, setSelectedData] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const getDataAsisten = async () => {
    try {
      const result = await getDataAsistensApi();
      setAsistens(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const result = await deleteAsistenApi(selectedData?.nip);
      if (result?.status === 200) {
        setOpenModalConfirm(false);
        setLoadingDelete(false);
        getDataAsisten();
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  // const deleteAsisten = (id) => {
  //   try {
  //     const remove = getDataAsistensApi(id);
  //     setAsistens([]);
  //     console.log(remove?.data?.data);
  //     window.location.reload(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getDataAsisten();
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
    const sortedData = [...asistens].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] < b[key] ? -1 : 1;
      } else {
        return a[key] > b[key] ? -1 : 1;
      }
    });

    // Perbarui state 'data' dengan data yang sudah diurutkan
    setAsistens(sortedData);
  };

  return (
    <>
      <ModalConfirm
        show={openModalConfirm}
        handleClose={() => setOpenModalConfirm(false)}
        title="Hapus Asisten"
        message="Apakah anda yakin menghapus data asisten ini?"
        loading={loadingDelete}
        handleSubmit={handleDelete}
      />
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h2 className="fw-bold">Daftar Asisten</h2>
            <hr />
            <div className="subtitle">LAB TIF</div>
          </div>
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
                  <h3 className="fw-bold">Daftar Data User</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">No</th>
                <th scope="col">
                  ID Asisten
                  <IoIcons.IoMdArrowDropdown
                    onClick={() => handleSort("asisten_id")}
                  />
                </th>
                <th scope="col">
                  NIM
                  <IoIcons.IoMdArrowDropdown
                    onClick={() => handleSort("nim")}
                  />
                </th>
                <th scope="col">
                  Nama
                  <IoIcons.IoMdArrowDropdown
                    onClick={() => handleSort("nama_asisten")}
                  />
                </th>
                <th scope="col">
                  Periode
                  <IoIcons.IoMdArrowDropdown
                    onClick={() => handleSort("periode")}
                  />
                </th>
                <th scope="col">
                  Golongan
                  <IoIcons.IoMdArrowDropdown
                    onClick={() => handleSort("golongan")}
                  />
                </th>
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
              {asistens &&
                asistens.map((asisten, index) => (
                  <tr key={asisten.asisten_id}>
                    <td>{index + 1}</td>
                    <td>{asisten.asisten_id}</td>
                    <td>{asisten.nim}</td>
                    <td>{asisten.nama_asisten}</td>
                    <td>{asisten.periode}</td>
                    <td>{asisten.golongan}</td>
                    <td>
                      <Link
                        to={`edit-asisten/${asisten?.asisten_id}`}
                        className="btn btn-warning mx-2 text-white"
                      >
                        <PiPencilSimpleBold />
                      </Link>
                      <button
                        onClick={(e) => {
                          setSelectedData(asisten);
                          setOpenModalConfirm(true);
                        }}
                        className="btn btn-danger"
                      >
                        <BiTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <NavLink
            href="/register"
            className="btn btn-primary col-md-4 offset-md-8 mt-4"
            id="btn-user"
          >
            Tambah Asisten
          </NavLink> */}
        </Container>
      </section>
    </>
  );
}
