import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import { getJadwalPraktikumByKelasApi } from "../../../api/jadwal/jadwalApi";
import {
  getKehadiranByPertemuan,
  postKehadiranApi,
  putKehadiranApi,
} from "../../../api/kehadiran/kehadiranApi";
import { getDataAsistensApi } from "../../../api/asistens/asistensApi";
import { PiPencilSimpleBold, PiCheckBold } from "react-icons/pi";
import { BiRefresh } from "react-icons/bi";
import ExportButton from "../../../components/button/ExportButton";

export default function Detail() {
  const { kelas_id } = useParams();
  const [jadwalPiket, setJadwalPiket] = useState([]);

  const [selectedKehadiran, setSelectedKehadiran] = useState("");
  const [selectedOldKehadiran, setSelectedOldKehadiran] = useState("");

  const [loadingSave, setLoadingSave] = useState(false);

  const [openSelect, setOpenSelect] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [listAsisten, setListAsisten] = useState([]);
  const [selectedAsisten, setSelectedAsisten] = useState("");

  const [listDataReport, setListDataReport] = useState([]);

  const getListAsisten = async () => {
    try {
      const result = await getDataAsistensApi();
      setListAsisten(result?.data?.data);
    } catch (error) {
      console.log(error);
      setListAsisten([]);
    }
  };

  const getJadwalPiket = async () => {
    try {
      const result = await getJadwalPraktikumByKelasApi(kelas_id, {
        periode: "20231",
      });

      if (result?.status === 200) {
        const groupedData = [];

        result?.data?.data.forEach((item) => {
          const pertemuan = item?.pertemuan;
          const existingGroup = groupedData.find(
            (group) => group.pertemuan === pertemuan
          );

          if (!existingGroup) {
            groupedData.push({ pertemuan, data: [item] });
          } else {
            existingGroup.data.push(item);
          }
        });

        await Promise.all(
          groupedData.map(async (group) => {
            const listKehadiran = await getKehadiranByPertemuan({
              praktik_id: group?.data[0]?.praktik_id,
              pertemuan: group?.pertemuan,
            });

            group.data = group?.data?.map((item) => {
              let status = "";
              let absen_id = null;
              let pengganti_id = null;
              let nama_pengganti = null;

              listKehadiran?.data?.data.forEach((kehadiran) => {
                if (item?.piket_id === kehadiran.piket_id) {
                  status = kehadiran?.status;
                  pengganti_id = kehadiran?.pengganti_id;
                  nama_pengganti = kehadiran?.nama_pengganti;
                  absen_id = kehadiran?.absen_id;
                }
              });

              return {
                ...item,
                absen_id: absen_id,
                kehadiran: status,
                pengganti_id: pengganti_id,
                nama_pengganti: nama_pengganti,
              };
            });

            return group;
          })
        );

        setJadwalPiket(groupedData);

        const exportList = groupedData?.map((data, index) => {
          const dataKehadiran = data?.data?.map((item, idx) => {
            return {
              No: idx + 1,
              "ID Aslab": item?.asisten_id,
              Nama: item?.nama_asisten,
              Kehadiran: item?.kehadiran || "-",
              Pengganti: item?.nama_pengganti || "-",
            };
          });
          return {
            pertemuan: data?.pertemuan,
            data: dataKehadiran,
          };
        });

        setListDataReport(exportList);
      }
    } catch (error) {
      console.log(error);
      setJadwalPiket([]);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedKehadiran(value);
  };

  const handleCheck = async () => {
    setLoadingSave(true);
    const saveData = {
      status: selectedKehadiran,
      pengganti_id: selectedAsisten || null,
    };

    if (
      selectedKehadiran !== selectedOldKehadiran &&
      selectedOldKehadiran !== ""
    ) {
      try {
        const result = await putKehadiranApi(selectedData?.absen_id, saveData);

        if (result?.status === 200) {
          setLoadingSave(false);
          getJadwalPiket();
          setOpenSelect(false);
          setSelectedAsisten("");
          setSelectedKehadiran("");
        }
      } catch (error) {
        console.log(error);
        setLoadingSave(false);
      }
    } else {
      try {
        const result = await postKehadiranApi(selectedData?.piket_id, saveData);

        if (result?.status === 201) {
          setLoadingSave(false);
          getJadwalPiket();
          setOpenSelect(false);
          setSelectedAsisten("");
          setSelectedKehadiran("");
        }
      } catch (error) {
        console.log(error);
        setLoadingSave(false);
      }
    }
  };

  useEffect(() => {
    getJadwalPiket();
    getListAsisten();
  }, []);

  return (
    <>
      <section id="teams" className="block teams-block">
        <Container fluid>
          <div className="title-holder">
            <h2 className="fw-bold">KEHADIRAN</h2>
            <hr />
            <div className="subtitle">LAB TIF</div>
          </div>
          <ExportButton
            excelData={listDataReport}
            fileName="Kehadiran"
          />

          {jadwalPiket?.map((data, index) => {
            return (
              <table
                key={data?.pertemuan}
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
                      <h3 className="fw-bold">{`Pertemuan ${data?.pertemuan}`}</h3>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">ID Aslab</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Kehadiran</th>
                    <th scope="col" style={{ width: "200px" }}>
                      Pengganti
                    </th>
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
                    data?.data?.map((asisten, asistenIndex) => (
                      <tr key={asisten.asisten_id}>
                        <td>{asistenIndex + 1}</td>
                        <td>{asisten.asisten_id}</td>
                        <td>{asisten.nama_asisten}</td>
                        <td>
                          {openSelect &&
                          selectedData?.piket_id === asisten?.piket_id ? (
                            <>
                              <div className="form-check form-check-inline">
                                <input
                                  className="btn-check"
                                  type="radio"
                                  name={`btnRadio-${asisten.asisten_id}-${asistenIndex}`}
                                  id={`presensiHadir-${asisten.asisten_id}`}
                                  value="Hadir"
                                  checked={
                                    selectedKehadiran === "Hadir" ||
                                    asisten?.kehadiran === "Hadir"
                                  }
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-check-label btn btn-outline-primary"
                                  htmlFor={`presensiHadir-${asisten.asisten_id}`}
                                >
                                  H
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="btn-check"
                                  type="radio"
                                  name={`btnRadio-${asisten.asisten_id}-${asistenIndex}`}
                                  id={`presensiIzin-${asisten.asisten_id}`}
                                  value="Izin"
                                  checked={
                                    selectedKehadiran === "Izin" ||
                                    asisten?.kehadiran === "Izin"
                                  }
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-check-label btn btn-outline-primary"
                                  htmlFor={`presensiIzin-${asisten.asisten_id}`}
                                >
                                  I
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="btn-check"
                                  type="radio"
                                  name={`btnRadio-${asisten.asisten_id}-${asistenIndex}`}
                                  id={`presensiAlpha-${asisten.asisten_id}`}
                                  value="Alpha"
                                  checked={
                                    selectedKehadiran === "Alpha" ||
                                    asisten?.kehadiran === "Alpha"
                                  }
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-check-label btn btn-outline-primary"
                                  htmlFor={`presensiAlpha-${asisten.asisten_id}`}
                                >
                                  A
                                </label>
                              </div>
                            </>
                          ) : (
                            <span>{asisten?.kehadiran}</span>
                          )}
                        </td>
                        <td>
                          {openSelect &&
                          selectedData?.piket_id === asisten?.piket_id &&
                          selectedKehadiran !== "Hadir" ? (
                            <select
                              className="form-select"
                              //   name={`asisten_${asistIndex}`}
                              aria-label="Default select example"
                              value={selectedAsisten || asisten?.pengganti_id}
                              onChange={(e) => {
                                const value = e.target.value;
                                setSelectedAsisten(value);
                              }}
                            >
                              <option value="">Pilih Asisten Baru...</option>
                              {listAsisten?.map((data) => (
                                <option
                                  value={`${data?.asisten_id}`}
                                  key={data?.asisten_id}
                                >
                                  {`${data?.nama_asisten}`}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <td>{asisten?.nama_pengganti || "-"}</td>
                          )}
                        </td>
                        <td>
                          {openSelect &&
                          selectedData?.piket_id === asisten?.piket_id ? (
                            <>
                              {loadingSave ? (
                                <div>Loading...</div>
                              ) : (
                                <>
                                  <button
                                    onClick={handleCheck}
                                    className="btn btn-success mx-2 text-white"
                                  >
                                    <PiCheckBold />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedKehadiran(asisten?.kehadiran);
                                    }}
                                    className="btn btn-secondary"
                                  >
                                    <BiRefresh />
                                  </button>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setOpenSelect(true);
                                  setSelectedData(asisten);
                                  setSelectedKehadiran(asisten?.kehadiran);
                                  setSelectedOldKehadiran(asisten?.kehadiran);
                                  setSelectedAsisten(asisten?.pengganti_id);
                                }}
                                className="btn btn-warning mx-2 text-white"
                              >
                                <PiPencilSimpleBold />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            );
          })}

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
