import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "../../assets/styles/navAdmin.css";
import { IconContext } from "react-icons";
import { useNavigate, NavLink } from "react-router-dom";
import { MdOutlineEdit as Edit, MdLogout as LogOut } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

export default function NavLaboran() {
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const { authTokens } = useAuth();
  const handleOpenModal = () => {
    setShowModalConfirm(true);
  };
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const navigate = useNavigate();
  const { setLogout } = useAuth();

  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setLogout();
  };

  const NavLaboranData = [
    {
      title: "Beranda",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "Data User",
      path: "/data-user",
      icon: <FaIcons.FaUsers />,
      cName: "nav-text",
    },
    {
      title: "Data Laboran",
      path: "/data-laboran",
      icon: <FaIcons.FaUserCog />,
      cName: "nav-text",
    },
    {
      title: "Data Asisten",
      path: "/data-asisten",
      icon: <FaIcons.FaUserTie />,
      cName: "nav-text",
    },
    {
      title: "Kehadiran Asisten",
      path: "/kehadiran",
      icon: <Fa6Icons.FaListCheck />,
      cName: "nav-text",
    },
    {
      title: "Program",
      path: "/program",
      icon: <FaIcons.FaCalendarDay />,
      cName: "nav-text",
    },
    {
      title: "Pengumuman",
      path: "/pengumuman",
      icon: <FaIcons.FaInfoCircle />,
      cName: "nav-text",
    },
    {
      title: "Validasi Data Pendaftaran",
      path: "/validasi",
      icon: <FaIcons.FaClipboardCheck />,
      cName: "nav-text",
    },
  ];

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {NavLaboranData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    {item?.path ? (
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <Link onClick={item?.onClick}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
              {authTokens ? (
                <>
                  <li
                    className="btn btn-logout text-white"
                    style={{
                      marginTop: "10px",
                      fontSize: "17px",
                      marginLeft: "20px",
                    }}
                    id="dropItem"
                    onClick={HandleLogout}
                    // onClick={openModal}
                  >
                    <LogOut id="outIcon" style={{}} />
                    <span>Log Out</span>
                  </li>
                </>
              ) : (
                <>
                  {/* Form */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-uppercase login"
                      to="/login"
                    >
                      Masuk
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </IconContext.Provider>
      </IconContext.Provider>
    </>
  );
}
