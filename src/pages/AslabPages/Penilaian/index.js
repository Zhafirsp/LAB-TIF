import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { PiPencilSimpleBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  // getJadwalApi,
  getJadwalPraktikumApi,
} from "../../../api/jadwal/jadwalApi";

export default function Penilaian() {
  const [jadwal, setJadwal] = useState();

  const getJadwalPraktikum = async () => {
    try {
      const result = await getJadwalPraktikumApi({ periode: 20231 });
      if (result?.status === 200) {
        const groupedData = [];

        result?.data?.data.forEach((item) => {
          const hari = item?.hari;

          const existingGroup = groupedData.find(
            (group) => group.hari === hari
          );
          if (!existingGroup) {
            groupedData.push({ hari, data: [item] });
          } else {
            existingGroup.data.push(item);
          }
        });

        groupedData.forEach((group) => {
          const uniqueKeys = new Set();
          group.data = group.data.filter((item) => {
            const key = `${item.kelas_id}_${item.kode_mk}`;
            if (!uniqueKeys.has(key)) {
              uniqueKeys.add(key);
              return true;
            }
            return false;
          });
        });

        setJadwal(groupedData);
      }
    } catch (error) {
      console.log(error);
      setJadwal([]);
    }
  };

  useEffect(() => {
    getJadwalPraktikum();
  }, []);

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h3
              className="fs-3 fw-normal mt-5"
              style={{ letterSpacing: "7px" }}
            >
              PENILAIAN PRAKTIKAN
            </h3>
            <h1 className="fs-1 fw-bold mt-3">LAB - TIF</h1>
            <hr />
          </div>
          {jadwal?.map((data, index) => {
            return (
              <table
                key={data?.hari}
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
                    <th className="text-center" colSpan={"10"}>
                      <h3 className="fw-bold">{data?.hari}</h3>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Kode MK</th>
                    <th scope="col">Mata Kuliah</th>
                    <th scope="col">Kelas</th>
                    <th scope="col">Asisten</th>
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
                  {data?.data &&
                    data?.data.map((jdwl, index) => (
                      <tr key={jdwl.praktik_id}>
                        <td>{index + 1}</td>
                        <td>{jdwl?.kode_mk}</td>
                        <td>{jdwl?.Matkul.nama_mk}</td>
                        <td>{jdwl?.Kela?.nama_kelas}</td>
                        <td style={{ textAlign: "left" }}>
                          {jdwl?.JadwalPikets?.map((asist) => (
                            <div key={asist?.asisten_id}>
                              <span>{asist?.nama_asisten}</span>
                            </div>
                          ))}
                        </td>
                        <td>
                          <Link
                            to={`/input-nilai/${jdwl?.kelas_id}`}
                            className="btn btn-warning mx-2 text-white"
                          >
                            <PiPencilSimpleBold />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            );
          })}
        </Container>
      </section>
    </>
  );
}
