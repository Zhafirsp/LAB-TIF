import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt, BiPlusCircle } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getPraktikanApi } from "../../../api/SevimaData/SevimaApi";
import {
  getPenialainByKelasApi,
  postPenilaianApi,
  putPenilaianApi,
  deletePenilaianApi,
} from "../../../api/penilaian/penilaianApi";

import ModalAddNilai from "../../../components/modal/ModalAddNilai";
import ModalConfirm from "../../../components/modal/ModalConfirm";
import ModalEditNilai from "../../../components/modal/ModalEditNilai";

export default function Penilaian() {
  const { kelas_id } = useParams();

  const [listPraktikan, setListPraktikan] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const getListPraktikan = async () => {
    try {
      const result = await getPraktikanApi({ kelas_id: kelas_id });
      const nilai = await getPenialainByKelasApi(kelas_id);

      if (result?.status === 200 && nilai?.status === 200) {
        const dataList = result?.data?.data?.map((item) => {
          const nilaiMahasiswa = nilai?.data?.data?.filter(
            (data) => data?.krs_id === item?.krs_id
          );
          return {
            ...item,
            tugas: nilaiMahasiswa,
          };
        });

        setListPraktikan(dataList);
      }
    } catch (error) {
      console.log(error);
      setListPraktikan([]);
    }
  };

  const handleSave = async (saveData) => {
    setLoadingSave(true);
    try {
      const result = await postPenilaianApi(selectedData?.krs_id, saveData);
      if (result?.status === 201) {
        setLoadingSave(false);
        getListPraktikan();
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingSave(false);
    }
  };

  const handleSaveEdit = async (id, saveData) => {
    setLoadingEdit(true);
    try {
      const result = await putPenilaianApi(id, saveData);
      if (result?.status === 200) {
        setLoadingEdit(false);
        getListPraktikan();
        setOpenModalEdit(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingEdit(false);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const result = await deletePenilaianApi(selectedData?.krs_id);
      if (result?.status === 200) {
        setOpenModalConfirm(false);
        setLoadingDelete(false);
        getListPraktikan();
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    getListPraktikan();
  }, []);

  return (
    <>
      <ModalAddNilai
        show={openModal}
        handleClose={() => setOpenModal(false)}
        loading={loadingSave}
        handleSubmit={handleSave}
      />

      <ModalEditNilai
        show={openModalEdit}
        handleClose={() => setOpenModalEdit(false)}
        loading={loadingEdit}
        data={selectedData}
        handleSubmit={handleSaveEdit}
      />

      <ModalConfirm
        show={openModalConfirm}
        handleClose={() => setOpenModalConfirm(false)}
        title="Hapus Penilaian"
        message="Apakah anda yakin menghapus data Penilaian ini?"
        loading={loadingDelete}
        handleSubmit={handleDelete}
      />
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h3
              className="fs-3 fw-normal mt-5"
              style={{ letterSpacing: "7px" }}
            >
              PENILAIAN PRAKTIKAN 11
            </h3>
            <h1 className="fs-1 fw-bold mt-3">LAB - TIF</h1>
            {/* <h3 className="fs-3 fw-normal" style={{ letterSpacing: "7px" }}>
              YANG TELAH LOLOS SELEKSI
            </h3> */}
            <hr />
            {/* <div className="subtitle">
              Untuk daftar calon asisten LAB-TIF yang lolos bisa dilihat
              langsung disini
            </div> */}
          </div>
          <table
            className="table table-bordered text-center"
            style={{
              backgroundColor: "#063554",
              color: "white",
              borderRadius: "10px",
              marginBottom: "80px",
            }}
          >
            <thead>
              <tr>
                <th scope="col" rowSpan="2">
                  No
                </th>
                <th scope="col" rowSpan="2">
                  NRP
                </th>
                <th scope="col" rowSpan="2">
                  Nama
                </th>
                <th colSpan="5">Tugas</th>
                <th scope="col" rowSpan="2">
                  Aksi
                </th>
              </tr>
              <tr>
                <th scope="col">T1</th>
                <th scope="col">T2</th>
                <th scope="col">T3</th>
                <th scope="col">T4</th>
                <th scope="col">T5</th>
              </tr>
            </thead>
            <tbody
              style={{
                backgroundColor: "#fff",
                color: "black",
                borderRadius: "10px",
              }}
            >
              {listPraktikan &&
                listPraktikan.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.nim}</td>
                    <td>{item?.Mahasiswa?.nama_mahasiswa}</td>
                    {item?.tugas.map((tugasItem, tugasIndex) => (
                      <td key={tugasIndex}>{tugasItem?.nilai || "-"}</td>
                    ))}
                    {new Array(5 - (item?.tugas.length || 0))
                      .fill(null)
                      .map((_, emptyIndex) => (
                        <td key={emptyIndex}>{"-"}</td>
                      ))}

                    <td>
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedData(item);
                        }}
                        className="btn btn-success text-white"
                      >
                        <BiPlusCircle />
                      </button>
                      <button
                        onClick={() => {
                          setOpenModalEdit(true);
                          setSelectedData(item);
                        }}
                        className="btn btn-warning mx-2 text-white"
                      >
                        <PiPencilSimpleBold />
                      </button>
                      <button
                        onClick={() => {
                          setOpenModalConfirm(true);
                          setSelectedData(item);
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
        </Container>
      </section>
    </>
  );
}
