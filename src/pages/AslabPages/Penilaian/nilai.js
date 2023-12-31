import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt, BiPlusCircle } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx-js-style";

import {
  getPraktikanApi,
  postSevimaKrs,
} from "../../../api/SevimaData/SevimaApi";
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

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState(false);

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
      setAlertError(true);
      setAlertMessage(error?.response?.data?.error);
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
      setAlertError(true);
      setAlertMessage(error?.response?.data?.error);
    }
  };

  const handleUpdateData = async () => {
    setLoadingUpdate(true);
    const saveData = {
      periode: "20231",
      limir: 6000,
    };

    try {
      const result = await postSevimaKrs(saveData);

      if (result?.status === 200) {
        setLoadingUpdate(false);
        getListPraktikan();
      }
    } catch (error) {
      console.log(error);
      setLoadingUpdate(false);
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

  const exportExcel = () => {
    const excelData = listPraktikan?.map((item, index) => {
      return {
        No: index + 1,
        NRP: item?.nim,
        Nama: item?.Mahasiswa?.nama_mahasiswa,
        T1: item?.tugas[0]?.nilai || "-",
        T2: item?.tugas[1]?.nilai || "-",
        T3: item?.tugas[2]?.nilai || "-",
        T4: item?.tugas[3]?.nilai || "-",
        T5: item?.tugas[4]?.nilai || "-",
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    return XLSX.writeFile(workbook, `Penilaian.xlsx`);
  };

  useEffect(() => {
    getListPraktikan();
  }, []);

  console.log(listPraktikan);

  return (
    <>
      <ModalAddNilai
        show={openModal}
        handleClose={() => setOpenModal(false)}
        loading={loadingSave}
        alertError={alertError}
        setAlertError={setAlertError}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
        handleSubmit={handleSave}
      />

      <ModalEditNilai
        show={openModalEdit}
        handleClose={() => setOpenModalEdit(false)}
        loading={loadingEdit}
        alertError={alertError}
        setAlertError={setAlertError}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
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
            <hr />
          </div>
          <button
            type="button"
            onClick={handleUpdateData}
            className="btn btn-warning col-4 mx-auto mb-2 text-white"
            id="submit"
          >
            {loadingUpdate ? "Loading..." : "Update Data"}
          </button>
          <button
            className="btn btn-primary col-4 mx-2 py-2 mb-2 text-white"
            onClick={() => {
              exportExcel();
            }}
          >
            Cetak Nilai
          </button>
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
                    <td>
                      {item?.tugas?.find((item) => item?.tugas_ke === 1)
                        ?.nilai || "-"}
                    </td>
                    <td>
                      {item?.tugas?.find((item) => item?.tugas_ke === 2)
                        ?.nilai || "-"}
                    </td>
                    <td>
                      {item?.tugas?.find((item) => item?.tugas_ke === 3)
                        ?.nilai || "-"}
                    </td>
                    <td>
                      {item?.tugas?.find((item) => item?.tugas_ke === 4)
                        ?.nilai || "-"}
                    </td>
                    <td>
                      {item?.tugas?.find((item) => item?.tugas_ke === 5)
                        ?.nilai || "-"}
                    </td>
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
