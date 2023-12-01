import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../assets/styles/navMhs.css";
import { useNavigate, NavLink } from "react-router-dom";
import { MdOutlineEdit as Edit, MdLogout as LogOut } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { getProfileApi } from "../../api/profile/profileApi";

export default function NavAslab() {
  const [profile, setProfile] = useState();
  const { authTokens } = useAuth();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  }; 
  
  const { setLogout } = useAuth();

  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
    // navigate("/login");
    setLogout();
  };

  
  const token = localStorage.getItem("accessToken");
  const getUserProfile = async () => {
    try {
      const {data} = await getProfileApi({
        crossDomain: true,
        headers: {
        Authorization: `Bearer ${token}`,
    },
      });
      setProfile([]);
      console.log(data?.dataUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

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
                <Nav.Link href="/penilaian">Penilaian</Nav.Link>
                <Nav.Link href="/sertifikat">Sertifikat</Nav.Link>
              </Nav>
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
                  {/* <div class="dropdown nav-username">
                    <div
                      id="btnProfile"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <li className="nav-item">
                        <div
                          className="nav-link text-uppercase"
                          id="btnProfile"
                        >
                          <div id="avaNav">
                            {data?.image_url ? (
                              <Avatar src={data?.image_url} alt="profile" />
                            ) : (
                              <Avatar name={data?.username} alt="profile" />
                            )}
                          </div>
                          <div className="profile2">
                            <p className="userNameP">{data?.username}</p>
                          </div>
                        </div>
                      </li>
                    </div>
                    <div className="dropdown-menu" id="dropdownNav">
                      <div
                        className="dropdown-item btn btn-profile"
                        id="dropItem"
                        onClick={() => navigate.push(`/account`)}
                      >
                        <Edit id="editIcon" /> Account
                      </div>
                      <div class="dropdown-divider"></div>
                      <div
                        className="dropdown-item btn btn-logout"
                        id="dropItem"
                        // onClick={handleLogout}
                        onClick={openModal}
                      >
                        <LogOut id="outIcon" /> Log Out
                      </div>
                    </div>
                  </div> */}

                  <div
                    className="dropdown-item btn btn-logout"
                    id="dropItem"
                    onClick={HandleLogout}
                    // onClick={openModal}
                  >
                    <LogOut id="outIcon" /> Log Out
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
