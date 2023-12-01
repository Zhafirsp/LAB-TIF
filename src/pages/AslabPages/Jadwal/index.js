import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { PiPencilSimpleBold, PiCheckBold } from "react-icons/pi";
import { BiTrashAlt, BiRefresh } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  // getJadwalApi,
  getJadwalPraktikumApi,
  deleteJadwalByIdApi,
  postPiketApi,
  putPiketApi,
} from "../../../api/jadwal/jadwalApi";

import { postSevimaJadwal } from "../../../api/SevimaData/SevimaApi";

import { getDataAsistensApi } from "../../../api/asistens/asistensApi";
import { useAuth } from "../../../context/AuthContext";
import ModalConfirm from "../../../components/modal/ModalConfirm";

export default function JadwalLab() {
  const { userData } = useAuth();
  const [jadwal, setJadwal] = useState();

  const [selectedData, setSelectedData] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const [openSelect, setOpenSelect] = useState(false);
  const [listAsisten, setListAsisten] = useState([]);
  const [selectedOldAsisten, setSelectedOldAsisten] = useState("");
  const [selectedAsistens, setSelectedAsistens] = useState([]);
  const [selectedNewAsisten, setSelectedNewAsisten] = useState("");

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const getListAsisten = async () => {
    try {
      const result = await getDataAsistensApi();
      setListAsisten(result?.data?.data);
    } catch (error) {
      console.log(error);
      setListAsisten([]);
    }
  };

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

  const handleSingleAsistenChange = (value, index) => {
    setSelectedAsistens((prevSelectedAsistens) => {
      const updatedSelectedAsistens = [...prevSelectedAsistens];
      updatedSelectedAsistens[index] = value;
      return updatedSelectedAsistens;
    });
  };

  const handleCheck = async () => {
    setLoadingSave(true);
    let saveData = {};
    if (selectedNewAsisten !== "") {
      saveData = { periode: "20231", asisten_id: selectedNewAsisten };
      try {
        const result = await postPiketApi(selectedData?.kelas_id, saveData);
        if (result?.status === 201) {
          setLoadingSave(false);
          getJadwalPraktikum();
          setOpenSelect(false);
          setSelectedAsistens([]);
          setSelectedNewAsisten("");
        }
      } catch (error) {
        console.log(error);
        setLoadingSave(false);
      }
    } else {
      saveData = {
        periode: "20231",
        kelas_id: selectedData?.kelas_id,
        asisten_id: selectedAsistens?.toString(),
      };
      try {
        const result = await putPiketApi(selectedOldAsisten, saveData);
        if (result?.status === 200) {
          setLoadingSave(false);
          getJadwalPraktikum();
          setOpenSelect(false);
          setSelectedAsistens([]);
          setSelectedNewAsisten("");
        }
      } catch (error) {
        console.log(error);
        setLoadingSave(false);
      }
    }
  };

  const handleUpdateData = async () => {
    const saveData = { periode: "20231", limit: 6000, kurikulum: "221" };
    setLoadingUpdate(true);
    try {
      const result = await postSevimaJadwal(saveData);

      if (result?.status === 200) {
        setLoadingUpdate(false);
        getJadwalPraktikum();
      }
    } catch (error) {
      console.log(error);
      setLoadingUpdate(false);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const result = await deleteJadwalByIdApi(selectedData?.kelas_id, {
        periode: "20231",
      });
      if (result?.status === 200) {
        setOpenModalConfirm(false);
        setLoadingDelete(false);
        getJadwalPraktikum();
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    getJadwalPraktikum();
    getListAsisten();
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
            <h2 className="fw-bold">JADWAL SEMESTER</h2>
            <hr />
            <div className="subtitle">LAB TIF</div>
          </div>
          {userData?.role === "Laboran" && (
            <button
              type="button"
              onClick={handleUpdateData}
              className="btn btn-warning col-4 mx-auto mb-2 text-white"
              id="submit"
            >
              {loadingUpdate ? "Loading..." : "Update Data"}
            </button>
          )}

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
                    {userData?.role === "Laboran" && (
                      <th scope="col" style={{ width: "120px" }}>
                        Aksi
                      </th>
                    )}
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
                          {openSelect &&
                          selectedData?.praktik_id === jdwl?.praktik_id
                            ? jdwl?.JadwalPikets?.map((asist, asistIndex) => (
                                <div key={asist?.asisten_id}>
                                  <select
                                    className="form-select"
                                    name={`asisten_${asistIndex}`}
                                    aria-label="Default select example"
                                    value={
                                      selectedAsistens[asistIndex] ||
                                      asist?.asisten_id ||
                                      ""
                                    }
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setSelectedOldAsisten(asist?.asisten_id);
                                      handleSingleAsistenChange(
                                        value,
                                        asistIndex
                                      );
                                    }}
                                    disabled={
                                      selectedAsistens?.length !== 0 ||
                                      selectedNewAsisten !== ""
                                    }
                                  >
                                    <option value="">
                                      Pilih Asisten Baru...
                                    </option>
                                    {listAsisten?.map((data) => (
                                      <option
                                        value={`${data?.asisten_id}`} // Pastikan properti value menggunakan asisten_id
                                        key={data?.asisten_id}
                                      >
                                        {`${data?.nama_asisten}`}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ))
                            : jdwl?.JadwalPikets?.map((asist) => (
                                <div key={asist?.asisten_id}>
                                  <span>{asist?.nama_asisten}</span>
                                </div>
                              ))}

                          {openSelect &&
                            selectedData?.praktik_id === jdwl?.praktik_id && (
                              <div>
                                <select
                                  className="form-select"
                                  name={`asisten_new`}
                                  aria-label="Default select example"
                                  value={selectedNewAsisten || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedNewAsisten(value);
                                  }}
                                  disabled={selectedAsistens?.length > 0}
                                >
                                  <option value="">
                                    Pilih Asisten Baru...
                                  </option>
                                  {listAsisten?.map((data) => (
                                    <option
                                      value={`${data?.asisten_id}`}
                                      key={data?.asisten_id}
                                    >
                                      {`${data?.nama_asisten}`}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                        </td>
                        {userData?.role === "Laboran" && (
                          <td>
                            {openSelect &&
                            selectedData?.praktik_id === jdwl?.praktik_id ? (
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
                                        setSelectedAsistens([]);
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
                                    setSelectedData(jdwl);
                                  }}
                                  className="btn btn-warning mx-2 text-white"
                                >
                                  <PiPencilSimpleBold />
                                </button>
                                <button
                                  onClick={() => {
                                    setOpenModalConfirm(true);
                                    setSelectedData(jdwl);
                                  }}
                                  className="btn btn-danger"
                                >
                                  <BiTrashAlt />
                                </button>
                              </>
                            )}
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
