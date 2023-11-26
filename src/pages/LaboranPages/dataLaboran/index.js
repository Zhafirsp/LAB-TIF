import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  getDataLaboransApi,
  deleteLaboranApi,
} from "../../../api/laborans/laboransApi";
import ModalConfirm from "../../../components/modal/ModalConfirm";

export default function DataLaboran() {
  const [laborans, setLaborans] = useState();

  const [selectedData, setSelectedData] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const getDataLaborans = async () => {
    try {
      const result = await getDataLaboransApi();
      setLaborans(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const result = await deleteLaboranApi(selectedData?.nip);
      if (result?.status === 200) {
        setOpenModalConfirm(false);
        setLoadingDelete(false);
        getDataLaborans();
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  // const deleteLaboran = (id) => {
  //   try {
  //     const remove = getDataLaboransApi(id);
  //     setLaborans([]);
  //     console.log(remove?.data?.data);
  //     window.location.reload(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getDataLaborans();
  }, []);

  return (
    <>
      <ModalConfirm
        show={openModalConfirm}
        handleClose={() => setOpenModalConfirm(false)}
        title="Hapus Laboran"
        message="Apakah anda yakin menghapus data laboran ini?"
        loading={loadingDelete}
        handleSubmit={handleDelete}
      />
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h2 className="fw-bold">Daftar Laboran</h2>
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
                <th className="text-center" colSpan={"6"}>
                  <h3 className="fw-bold">Daftar Data Laboran</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">No</th>
                <th scope="col">NIP</th>
                <th scope="col">Nama</th>
                <th scope="col">Jenis Pegawai</th>
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
              {laborans &&
                laborans.map((laboran, index) => (
                  <tr key={laboran.nip}>
                    <td>{index + 1}</td>
                    <td>{laboran.nip}</td>
                    <td>{laboran.nama_laboran}</td>
                    <td>{laboran.jenis_pegawai}</td>
                    <td>
                      <Link
                        to={`/edit-laboran/${laboran?.nip}`}
                        className="btn btn-warning mx-2 text-white"
                      >
                        <PiPencilSimpleBold />
                      </Link>
                      <button
                        onClick={() => {
                          setOpenModalConfirm(true);
                          setSelectedData(laboran);
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
          <NavLink
            href="/tambah-laboran"
            className="btn btn-primary col-md-4 offset-md-8 mt-4"
            id="btn-user"
          >
            Tambah Laboran
          </NavLink>
        </Container>
      </section>
    </>
  );
}
