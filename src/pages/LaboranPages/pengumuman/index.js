import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getPengumumanApi,
  getActivePengumumanApi,
  deletePengumumanApi,
} from "../../../api/pengumuman/pengumumanApi";
import { useAuth } from "../../../context/AuthContext";
import ModalConfirm from "../../../components/modal/ModalConfirm";

export default function Pengumuman() {
  const { userData } = useAuth();
  const [listPengumuman, setListPengumuman] = useState([]);

  const [selectedData, setSelectedData] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const getPengumuman = async () => {
    try {
      let result;

      if (userData?.role === "Laboran") {
        result = await getPengumumanApi();
      } else {
        result = await getActivePengumumanApi();
      }

      if (result?.status === 200) {
        setListPengumuman(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
      setListPengumuman([]);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const result = await deletePengumumanApi(selectedData?.info_id);
      if (result?.status === 200) {
        setOpenModalConfirm(false);
        setLoadingDelete(false);
        getPengumuman();
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    getPengumuman();
  }, []);

  return (
    <>
      <ModalConfirm
        show={openModalConfirm}
        handleClose={() => setOpenModalConfirm(false)}
        title="Hapus Pengumuman"
        message="Apakah anda yakin menghapus pengumuman ini?"
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
              INFORMASI
            </h3>
            <h1 className="fs-1 fw-bold mt-3">LAB - TIF</h1>
            <hr />
          </div>
          <table
            class="table table-bordered text-center"
            style={{
              borderRadius: "10px",
            }}
          >
            <thead>
              <tr
                className="fs-4 fw-bold"
                style={{
                  backgroundColor: "#063554",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                <th scope="col">No</th>
                <th scope="col">Judul</th>
                <th scope="col">Dokumen</th>
                <th scope="col">Link</th>
                <th scope="col">Tanggal</th>
                {userData?.role === "Laboran" ? (
                  <>
                    <th scope="col">Status</th>
                    <th scope="col">Aksi</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {listPengumuman && listPengumuman?.length > 0 ? (
                <>
                  {listPengumuman?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data?.judul || "-"}</td>
                        <td>{data?.dokumen || "-"}</td>
                        <td>{data?.link || "-"}</td>
                        <td>{data?.tanggal_publish || "-"}</td>
                        {userData?.role === "Laboran" ? (
                          <>
                            <td>
                              {data?.is_publish ? "Aktif" : "Tidak Aktif"}
                            </td>
                            <td>
                              <Link
                                to={`/edit-pengumuman/${data?.info_id}`}
                                className="btn btn-warning mx-2 text-white"
                              >
                                <PiPencilSimpleBold />
                              </Link>
                              <button
                                onClick={() => {
                                  setOpenModalConfirm(true);
                                  setSelectedData(data);
                                }}
                                className="btn btn-danger"
                              >
                                <BiTrashAlt />
                              </button>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td colSpan={userData?.role === "Laboran" ? 6 : 5}>
                      Tidak ada data
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          {userData?.role === "Laboran" && (
            <NavLink
              href="/tambah-pengumuman"
              className="btn btn-primary col-md-4 offset-md-8 mt-4"
              id="btn-user"
            >
              Tambah Pengumuman
            </NavLink>
          )}
        </Container>
      </section>
    </>
  );
}
