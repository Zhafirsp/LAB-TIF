import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPendaftaranByNimApi,
  postValidateDataApi,
} from "../../../api/pendaftaran/pendaftaranApi";
import NavLink from "react-bootstrap/esm/NavLink";
import { AiOutlineCheck } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function Status() {
  const { nim } = useParams();
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState({});

  const [status, setStatus] = useState("");

  const validateData = async () => {
    try {
      const result = await postValidateDataApi(detailData?.daftar_id, status);
      if (result?.status === 201) {
        navigate("/validasi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    newWindow.opener = null;
  };

  useEffect(() => {
    const getDetailData = async () => {
      try {
        const result = await getPendaftaranByNimApi(nim);
        setDetailData(result?.data?.data);
        setStatus(result?.data?.data?.status);
      } catch (error) {
        console.log(error);
        setDetailData({});
      }
    };

    getDetailData();
  }, [nim]);

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h2 className="fw-bold">JADWAL SEMESTER</h2>
            <hr />
            <div className="subtitle">LAB TIF</div>
          </div>
          <table
            class="table table-bordered text-center"
            style={{
              backgroundColor: "#063554",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <thead>
              <tr className="fw-bold">
                <th scope="col">NRP</th>
                <th scope="col">Nama</th>
                <th scope="col">Tgl</th>
                <th scope="col">File</th>
                <th scope="col">Status</th>
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
              <tr>
                <td>{detailData?.nim}</td>
                <td>{detailData?.nama_mahasiswa}</td>
                <td>{detailData?.tanggal_daftar}</td>
                <td>
                  {detailData?.file_syarat ? (
                    <button
                      type="button"
                      class="btn btn-primary my-1"
                      onClick={() => openInNewTab(detailData?.file_syarat)}
                    >
                      Unduh
                    </button>
                  ) : (
                    <div>Tidak ada file</div>
                  )}
                </td>
                <div class="dropdown">
                  <select
                    className="form-select"
                    name="username"
                    aria-label="Default select example"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Pilih...</option>
                    <option value="Menunggu">Menunggu</option>
                    <option value="Diterima">Diterima</option>
                    <option value="Lulus">Lulus</option>
                  </select>
                  {/* <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pilihan
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      Edit
                    </a>
                    <a class="dropdown-item" href="#">
                      Hapus
                    </a>
                  </div> */}
                </div>
                <td>
                  <NavLink href="/validasi" id="btn-status">
                    <button
                      type="button"
                      class="btn btn-success mx-2"
                      onClick={validateData}
                    >
                      <AiOutlineCheck />
                    </button>
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      </section>
    </>
  );
}