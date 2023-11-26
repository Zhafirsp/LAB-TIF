import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { PiPencilSimpleBold } from "react-icons/pi";
import { NavLink, Link } from "react-router-dom";
import {
  // getJadwalApi,
  getJadwalPraktikumApi,
} from "../../../api/jadwal/jadwalApi";

import { useAuth } from "../../../context/AuthContext";
import ModalConfirm from "../../../components/modal/ModalConfirm";

export default function JadwalLab() {
  const { userData } = useAuth();
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
            <h2 className="fw-bold">Kehadiran</h2>
            <hr />
            <div className="subtitle">LAB TIF</div>
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
                    <th scope="col">Mulai</th>
                    <th scope="col">Selesai</th>
                    <th scope="col">Kode MK</th>
                    <th scope="col">Mata Kuliah</th>
                    <th scope="col">SKS</th>
                    <th scope="col">Kelas</th>
                    <th scope="col">Ruang</th>
                    <th scope="col">Dosen</th>
                    <th scope="col">Asisten</th>
                    {userData?.role === "Laboran" && <th scope="col">Aksi</th>}
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
                        <td>{jdwl?.jam_mulai}</td>
                        <td>{jdwl?.jam_selesai}</td>
                        <td>{jdwl?.kode_mk}</td>
                        <td>{jdwl?.Matkul.nama_mk}</td>
                        <td>{jdwl?.Matkul.sks_mk}</td>
                        <td>{jdwl?.Kela?.nama_kelas}</td>
                        <td>{jdwl?.Kela?.nama_ruang}</td>
                        <td>{jdwl?.Dosen?.nama_dosen}</td>
                        <td style={{ textAlign: "left" }}>
                          {jdwl?.JadwalPikets?.map((asist) => (
                            <div key={asist?.asisten_id}>
                              <span>{asist?.nama_asisten}</span>
                            </div>
                          ))}
                        </td>
                        {userData?.role === "Laboran" && (
                          <td>
                            <Link
                              to={`/piket/${jdwl?.kelas_id}`}
                              className="btn btn-warning mx-2 text-white"
                            >
                              <PiPencilSimpleBold />
                            </Link>
                          </td>
                        )}
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
