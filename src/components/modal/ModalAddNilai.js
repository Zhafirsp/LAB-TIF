/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

const ModalAddNilai = ({
  title,
  //   message,
  show,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    handleSubmit(saveData);
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
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              style={{ color: "#fff" }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center mx-2">
                <label className="form-label input mx-2" htmlFor="cpmk">
                  CPMK
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.cpmk}
                  type="text"
                  // placeholder="Judul"
                  className="form-control"
                  id="cpmk"
                  name="cpmk"
                  style={{ width: "80px" }}
                />
              </div>
              <div className="d-flex align-items-center mx-2">
                <label className="form-label input mx-2" htmlFor="tugas_ke">
                  Tugas
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.tugas_ke}
                  type="text"
                  // placeholder="Judul"
                  className="form-control"
                  id="tugas_ke"
                  name="tugas_ke"
                  style={{ width: "80px" }}
                />
              </div>
              <div className="d-flex align-items-center mx-2">
                <label className="form-label input mx-2" htmlFor="nilai">
                  Nilai
                </label>
                <input
                  onChange={handleChange}
                  value={dataForm?.nilai}
                  type="text"
                  // placeholder="Judul"
                  className="form-control"
                  id="nilai"
                  name="nilai"
                  style={{ width: "80px" }}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddNilai;
