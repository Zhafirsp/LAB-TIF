import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoutImg from "../../assets/images/logout.png";
import Logo from "../../assets/images/logo.png"


export default function Logout({ showModal, setShowModal }) {
  const navigate = useNavigate();
  const { setLogout } = useAuth();


  const onHandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
    setLogout();
    setShowModal(false);
  };

  return (
    <>
      
                  <button type='button' className="modal-logout-btn-y" onClick={onHandleLogout}>
                    Yakin
                  </button>
               
    </>
  );
}
