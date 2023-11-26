import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  getDataProgramApi,
  deleteProgramApi,
} from "../../../api/programs/programApi";
import ModalConfirm from "../../../components/modal/ModalConfirm";

export default function DataProgram() {
  const [program, setProgram] = useState();

  const [selectedData, setSelectedData] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const getDataPrograms = async () => {
    try {
      const result = await getDataProgramApi();
      setProgram(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const result = await deleteProgramApi(selectedData?.program_id);
      if (result?.status === 200) {
        setOpenModalConfirm(false);
        setLoadingDelete(false);
        getDataPrograms();
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  // const deleteProgram = (id) => {
  //   try {
  //     const remove = getDataProgramsApi(id);
  //     setProgram([]);
  //     console.log(remove?.data?.data);
  //     window.location.reload(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getDataPrograms();
  }, []);

  return (
    <>
      <ModalConfirm
        show={openModalConfirm}
        handleClose={() => setOpenModalConfirm(false)}
        title="Hapus Program"
        message="Apakah anda yakin menghapus data Program ini?"
        loading={loadingDelete}
        handleSubmit={handleDelete}
      />
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h2 className="fw-bold">Program</h2>
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
                <th scope="col">No</th>
                <th scope="col">Periode</th>
                <th scope="col">Judul</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Batas Waktu</th>
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
              {program &&
                program.map((item, index) => (
                  <tr key={item.nip}>
                    <td>{index + 1}</td>
                    <td>{item.periode}</td>
                    <td>{item.judul}</td>
                    <td>{item.deskripsi}</td>
                    <td>{item.batas_waktu}</td>
                    <td>
                      <Link
                        to={`/edit-program/${item?.program_id}`}
                        className="btn btn-warning mx-2 text-white"
                      >
                        <PiPencilSimpleBold />
                      </Link>
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
          <NavLink
            href="/tambah-program"
            className="btn btn-primary col-md-4 offset-md-8 mt-4"
            id="btn-user"
          >
            Tambah Program
          </NavLink>
        </Container>
      </section>
    </>
  );
}
