import React from "react";

const ModalConfirm = ({
  title,
  message,
  show,
  loading,
  handleClose,
  handleSubmit,
}) => {
  if (!show) {
    return null;
  }

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
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleClose}
            >
              Tidak
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Ya"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
