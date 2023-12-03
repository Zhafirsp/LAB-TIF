import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { getDataProgramApi } from "../../../api/programs/programApi";
import { getPendaftaranByProgramApi } from "../../../api/pendaftaran/pendaftaranApi";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

export default function Validasi() {
  const [listData, setListData] = useState([]);
  const [listProgram, setListProgram] = useState([]);
  const [program, setProgram] = useState();

  const getDataPendaftaran = async (programId) => {
    try {
      const result = await getPendaftaranByProgramApi(programId);
      const data = result?.data?.data.map((item, index) => {
        return {
          ...item,
          no: index + 1,
        };
      });
      setListData(data);
    } catch (error) {
      setListData([]);
      console.log(error);
    }
  };

  const getDataPrograms = async () => {
    try {
      const result = await getDataProgramApi();
      setListProgram(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    newWindow.opener = null;
  };

  useEffect(() => {
    getDataPrograms();
  }, []);

  useEffect(() => {
    if (program) {
      getDataPendaftaran(program);
    }
  }, [program]);

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h2 className="fw-bold">Validasi Data Pendaftaran</h2>
            <hr />
            <div className="subtitle">LAB TIF</div>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="username"
              aria-label="Default select example"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option value="">Pilih Program...</option>
              {listProgram?.map((data, index) => {
                return (
                  <>
                    <option value={`${data?.program_id}`} key={index}>
                      {`${data?.judul}`}
                    </option>
                  </>
                );
              })}
            </select>
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
              {listData &&
                listData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item?.no}</th>
                      <td>{item?.nim}</td>
                      <td>{item?.nama_mahasiswa}</td>
                      <td>{item?.tanggal_daftar}</td>
                      <td>
                        {item?.file_syarat ? (
                          <button
                            type="button"
                            className="btn btn-primary my-1"
                            onClick={() => openInNewTab(item?.file_syarat)}
                          >
                            Unduh
                          </button>
                        ) : (
                          <div>Tidak ada file</div>
                        )}
                      </td>
                      <td>{item?.status}</td>
                      <td>
                        <NavLink href={`/status/${item?.nim}`} id="btn-status">
                          <button
                            type="button"
                            className="btn btn-warning mx-2 text-white"
                          >
                            <PiPencilSimpleBold />
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Container>
      </section>
    </>
  );
}
