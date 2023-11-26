import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../assets/styles/navMhs.css";
import { useNavigate, NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import checkLogin from "../../utils/checkLogin";
import {
  MdOutlineEdit as Edit,
  MdLogout as LogOut,
  MdClose as Close,
  MdPerson as User,
} from "react-icons/md";
import Avatar from "react-avatar";
import Logout from "../modal/Logout";
import { useAuth } from "../../context/AuthContext";
import { getProfileApi } from "../../api/profile/profileApi";
import { Link } from "react-router-dom";

export default function NavMhs() {
  //user profile
  const [profile, setProfile] = useState();
  const [userLogin, setUserLogin] = useState([]);
  const { authTokens } = useAuth();
  const [data, setData] = useState();
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const { setLogout } = useAuth();

  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    // navigate("/login");
    setLogout();
  };

  const token = localStorage.getItem("accessToken");
  const getUserProfile = async () => {
    try {
      const result = await getProfileApi();
      setProfile(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const NavMhsData = [
    {
      title: "Beranda",
      path: "/",
    },
    {
      title: "Civitas",
      path: "/civitas",
    },
    {
      title: "Cara Mendaftar",
      path: "/mendaftar",
    },
    {
      title: "Pendaftaran",
      path: "/pendaftaran",
    },
    {
      title: "Pengumuman",
      path: "/pengumuman",
    },
  ];

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* LEFT */}
          <div className="col-md-3 mb-2 mb-md-0">
            <Navbar.Brand href="/">LAB-TIF</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* CENTER */}
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/civitas">Civitas</Nav.Link>
                <Nav.Link href="/mendaftar">Cara Mendaftar</Nav.Link>
                <Nav.Link href="/pendaftaran">Pendaftaran</Nav.Link>
                <Nav.Link href="/pengumuman">Pengumuman</Nav.Link>
              </Nav>
              {/* {NavLMhsData.map((item, index) => {
                return (
                  <Nav.Link key={index}>
                    {item?.path ? (
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    ) : (<span>no menu</span>)}
                  </Nav.Link>
                );
              })} */}
            </Navbar.Collapse>
          </ul>
          {/* RIGHT */}
          <div className="col-md-3 text-end">
            <ul
              className="navbar-nav mb-md-5 mb-lg-0 navRight"
              id="navbar-right"
            >
              {authTokens ? (
                <>
                  <div className="dropdown nav-username">
                    {!showMenu && (
                      <button
                        className="btn btn-profile"
                        onClick={() => setShowMenu(true)}
                      >
                        <User
                          id="outIcon"
                          size={24}
                          style={{ marginRight: "12px" }}
                        />
                        {profile?.email}
                      </button>
                    )}
                    {showMenu && (
                      <div
                        className="d-flex flex-row"
                        id="btnProfile"
                        data-toggle="dropdown"
                      >
                        <div
                          className="dropdown-item btn btn-logout"
                          id="dropItem"
                          // onClick={HandleLogout}
                          style={{ marginRight: "12px" }}
                          // onClick={openModal}
                        >
                          <Link
                            to={`edit-profile/${profile?.user_id}`}
                            // className="btn btn-warning mx-2 text-white"
                          >
                            <Edit id="outIcon" /> Edit Profile
                          </Link>
                        </div>
                        <div
                          className="dropdown-item btn btn-logout"
                          id="dropItem"
                          onClick={HandleLogout}
                          style={{ marginRight: "12px" }}
                          // onClick={openModal}
                        >
                          <LogOut id="outIcon" /> Log Out
                        </div>
                        <div
                          className="dropdown-item btn btn-logout"
                          id="dropItem"
                          onClick={() => setShowMenu(false)}
                          // onClick={openModal}
                        >
                          <Close id="outIcon" />
                        </div>
                      </div>
                    )}

                    {/* <div className="dropdown-menu" id="dropdownNav"> */}
                    {/* <div
                        className="dropdown-item btn btn-profile"
                        id="dropItem"
                        onClick={() => navigate.push(`/account`)}
                      >
                        <Edit id="editIcon" /> Account
                      </div> */}
                    {/* <div className="dropdown-divider"> */}
                  </div>
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
          </div>
        </Container>
      </Navbar>
    </>
  );
}
