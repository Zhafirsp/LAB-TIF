import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { getDataAsistensApi } from "../../../api/asistens/asistensApi";

export default function Presensi() {
  const [asistens, setAsistens] = useState();
  const getDataAsisten = async () => {
    try {
      const result = await getDataAsistensApi();
      setAsistens(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataAsisten();
  }, []);

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
            className="table table-bordered text-center"
            style={{
              backgroundColor: "#063554",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <thead>
              <tr>
                <th className="text-center" colSpan={"11"}>
                  <h3 className="fw-bold">Pertemuan 1</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">No</th>
                <th scope="col">ID Aslab</th>
                <th scope="col">Nama</th>
                <th scope="col">Kehadiran</th>
                <th scope="col">Pengganti</th>
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
                    <td>{asisten.nama_asisten}</td>
                    <td>
                      <div className="form-check form-check-inline">
                        <input
                          className="btn-check"
                          type="radio"
                          name="btnRadio"
                          id="presensiHadir"
                          value="option1"
                        />
                        <label
                          className="form-check-label btn btn-outline-primary"
                          htmlFor="presensiHadir"
                        >
                          H
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="btn-check"
                          type="radio"
                          name="btnRadio"
                          id="presensiAlfa"
                          value="option2"
                        />
                        <label
                          className="form-check-label btn btn-outline-primary"
                          htmlFor="presensiAlfa"
                        >
                          I
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="btn-check"
                          type="radio"
                          name="btnRadio"
                          id="presensiIzin"
                          value="option3"
                        />
                        <label
                          className="form-check-label btn btn-outline-primary"
                          htmlFor="presensiIzin"
                        >
                          S
                        </label>
                      </div>
                    </td>
                    <td>
                      <td>{asisten.nama_asisten}</td>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <NavLink
            href="/kehadiran"
            className="btn btn-primary col-md-4 offset-md-8 mt-4"
            id="btn-user"
          >
            Simpan
          </NavLink>
        </Container>
      </section>
    </>
  );
}
