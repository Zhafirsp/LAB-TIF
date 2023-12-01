/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { PiPencilSimpleBold, PiCheckBold } from "react-icons/pi";

const ModalEditNilai = ({
  title,
  //   message,
  show,
  data,
  loading,
  handleClose,
  handleSubmit,
}) => {
  if (!show) {
    return null;
  }

  const [dataForm, setDataForm] = useState({
    cpmk: null,
    tugas_ke: null,
    nilai: null,
  });

  const [openSelect, setOpenSelect] = useState(false);
  const [selectId, setSelectId] = useState();

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [alertError, setAlertError] = useState(false);

  const handleChange = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleClickSave = () => {
    const saveData = {
      cpmk: Number(dataForm?.cpmk),
      tugas_ke: Number(dataForm?.tugas_ke),
      nilai: Number(dataForm?.nilai),
    };

    // console.log(saveData);

    if (
      dataForm?.cpmk === null ||
      dataForm?.tugas_ke === null ||
      dataForm?.nilai === null
    ) {
      setAlertError(true);
    } else {
      handleSubmit(selectId, saveData);
      // setOpenSelect(false);
      setEditingRowIndex(null);
      setDataForm({
        cpmk: null,
        tugas_ke: null,
        nilai: null,
      });
    }
  };

  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{
        display: "block",
        position: "fixed",
        // zIndex: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="modal-dialog"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#063554",
          //   padding: "20px",
          borderRadius: "5px",
          color: "#fff",
        }}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: "#063554",
            color: "#fff",
          }}
        >
          <div className="modal-header">
            <div>
              <h5 className="modal-title">{`Kelas: ${data?.nama_kelas}`}</h5>
              <h5 className="modal-title">{`Kode MK: ${data?.kode_mk}`}</h5>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              style={{ color: "#fff" }}
            ></button>
          </div>
          <div className="modal-body">
            {alertError && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "space-between",
                }}
              >
                <p style={{ color: "red" }}>
                  CPMK, Tugas, dan Nilai harus diisi
                </p>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAlertError(false)}
                  style={{
                    color: "#fff",
                    marginBottom: "18px",
                    marginLeft: "8px",
                  }}
                ></button>
              </div>
            )}
            {data?.tugas?.length > 0 ? (
              <>
                {data?.tugas?.map((tugas, index) => {
                  const isEditing = editingRowIndex === index;
                  return (
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center mx-1 mb-2">
                        <label
                          className="form-label input mx-2"
                          htmlFor={`cpmk-${tugas?.nilai_id}-${index}`}
                        >
                          CPMK
                        </label>
                        {!isEditing ? (
                          <span
                            style={{ fontSize: "24px", fontWeight: 600 }}
                            id={`cpmk-${tugas?.nilai_id}-${index}`}
                            name={`cpmk-${tugas?.nilai_id}-${index}`}
                          >
                            {tugas?.cpmk}
                          </span>
                        ) : (
                          <input
                            onChange={(e) =>
                              handleChange("cpmk", e.target.value)
                            }
                            value={dataForm?.cpmk}
                            type="text"
                            // placeholder="Judul"
                            className="form-control"
                            id={`cpmk-${tugas?.nilai_id}-${index}`}
                            name={`cpmk-${tugas?.nilai_id}-${index}`}
                            style={{ width: "60px" }}
                          />
                        )}
                      </div>
                      <div className="d-flex align-items-center mx-1 mb-2">
                        <label
                          className="form-label input mx-2"
                          htmlFor="tugas_ke"
                        >
                          Tugas
                        </label>
                        {!isEditing ? (
                          <span
                            style={{ fontSize: "24px", fontWeight: 600 }}
                            id={`tugas_ke-${tugas?.nilai_id}-${index}`}
                            name={`tugas_ke-${tugas?.nilai_id}-${index}`}
                          >
                            {tugas?.tugas_ke}
                          </span>
                        ) : (
                          <input
                            onChange={(e) =>
                              handleChange("tugas_ke", e.target.value)
                            }
                            value={dataForm?.tugas_ke}
                            type="text"
                            // placeholder="Judul"
                            className="form-control"
                            id={`tugas_ke-${tugas?.nilai_id}-${index}`}
                            name={`tugas_ke-${tugas?.nilai_id}-${index}`}
                            style={{ width: "60px" }}
                          />
                        )}
                      </div>
                      <div className="d-flex align-items-center mx-1 mb-2">
                        <label
                          className="form-label input mx-2"
                          htmlFor="nilai"
                        >
                          Nilai
                        </label>
                        {!isEditing ? (
                          <span
                            style={{ fontSize: "24px", fontWeight: 600 }}
                            id={`nilai-${tugas?.nilai_id}-${index}`}
                            name={`nilai-${tugas?.nilai_id}-${index}`}
                          >
                            {tugas?.nilai}
                          </span>
                        ) : (
                          <input
                            onChange={(e) =>
                              handleChange("nilai", e.target.value)
                            }
                            value={dataForm?.nilai}
                            type="text"
                            // placeholder="Judul"
                            className="form-control"
                            id={`nilai-${tugas?.nilai_id}-${index}`}
                            name={`nilai-${tugas?.nilai_id}-${index}`}
                            style={{ width: "60px" }}
                          />
                        )}
                      </div>

                      <div className="d-flex align-items-center mx-1 mb-2">
                        {isEditing ? (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleClickSave}
                          >
                            {loading ? "Loading..." : <PiCheckBold />}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => {
                              setEditingRowIndex(index);
                              setSelectId(tugas?.nilai_id);
                            }}
                          >
                            <PiPencilSimpleBold />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="d-flex align-items-center mx-5 my-2">
                Belum ada penilaian
              </div>
            )}
          </div>
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClose}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleClickSave}
            >
              {loading ? "Loading..." : "Simpan"}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalEditNilai;
