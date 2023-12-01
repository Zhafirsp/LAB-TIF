import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import React, { Component, useEffect, useState, useMemo } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import NotFound from "./pages/errors/NotFound";
import Welcome from "./pages/Home/Welcome";
import Unauthorized from "./components/Unauthorized";
import Mendaftar from "./pages/MahasiswaPages/caraMendaftar";
import Pendaftaran from "./pages/MahasiswaPages/pendaftaran";
import Pengumuman from "./pages/LaboranPages/pengumuman";
import AddPengumuman from "./pages/LaboranPages/pengumuman/add";
import DataUser from "./pages/LaboranPages/dataUser";
import EditUser from "./pages/LaboranPages/dataUser/edit";
import DataLaboran from "./pages/LaboranPages/dataLaboran";
import AddLaboran from "./pages/LaboranPages/dataLaboran/add";
import EditLaboran from "./pages/LaboranPages/dataLaboran/edit";
import DataAsisten from "./pages/LaboranPages/dataAsisten";
import EditAsisten from "./pages/LaboranPages/dataAsisten/edit";
import Kehadiran from "./pages/LaboranPages/kehadiranAsisten";
import DetailKehadiran from "./pages/LaboranPages/kehadiranAsisten/detail";
import Presensi from "./pages/LaboranPages/kehadiranAsisten/presensi";
import Validasi from "./pages/LaboranPages/validasiData";
import Status from "./pages/LaboranPages/validasiData/status";
import Register from "./pages/auth/Register";
import JadwalLab from "./pages/AslabPages/Jadwal";
import Penilaian from "./pages/AslabPages/Penilaian";
import InputNilai from "./pages/AslabPages/Penilaian/nilai";
import Sertifikat from "./pages/AslabPages/Sertifikat/sertifikat";
import Footer from "./components/footer";
import NavMhs from "./components/NavigationBar/navMhs";
import NavLaboran from "./components/NavigationBar/navLaboran";
import NavAslab from "./components/NavigationBar/navAslab";
import EditPengumuman from "./pages/LaboranPages/pengumuman/edit";
import Program from "./pages/LaboranPages/program";
import AddProgram from "./pages/LaboranPages/program/add";
import EditProgram from "./pages/LaboranPages/program/edit";

function App() {
  const existingToken = localStorage.getItem("accessToken");
  const [authTokens, setAuthTokens] = useState(existingToken);
  const [userData, setUserData] = useState();

  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const setLogout = () => {
    localStorage.clear();
    setAuthTokens(null);
  };

  const setTokens = (data) => {
    localStorage.setItem("accessToken", data);
    localStorage.setItem("refresh_Token", data);
    Cookies.set("accessToken", data);
    Cookies.set("refreshToken", data);
    setAuthTokens(data);
    console.log(data);
  };

  const dataContext = useMemo(
    () => ({ authTokens, setAuthTokens: setTokens, setLogout, userData }),
    [authTokens, userData]
  );

  useEffect(() => {
    if (authTokens) {
      const accessDecode = jwtDecode(authTokens);
      const dataUser = {
        user_id: accessDecode.user_id,
        role: accessDecode.role,
        username: accessDecode.username,
      };
      setUserData(dataUser);
    }
    setIsLoading(false);
  }, [authTokens]);

  return (
    <div className="App">
      <AuthContext.Provider value={dataContext}>
        {authTokens ? (
          <>
            <header id="header">
              {userData?.role === "Laboran" ? (
                <NavLaboran />
              ) : userData?.role === "Asisten" ? (
                <NavAslab />
              ) : (
                <NavMhs />
              )}
            </header>
            <Routes>

              <Route path="unauthorized" element={<Unauthorized />} />

              {/* Mahasiswa Routes */}
              {userData?.role === "Mahasiswa" && (
                <Route path="/" element={<Welcome />} />
              )}
              {userData?.role === "Mahasiswa" && (
                <Route path="/pengumuman" element={<Pengumuman />} />
              )}
              {userData?.role === "Mahasiswa" && (
                <Route path="/mendaftar" element={<Mendaftar />} />
              )}
              {userData?.role === "Mahasiswa" && (
                <Route path="/Pendaftaran" element={<Pendaftaran />} />
              )}
              {userData?.role === "Mahasiswa" && (
                <Route exact path="/edit-profile/:id" element={<EditUser />} />
              )}

              {/* Asisten Lab Routes */}
              {userData?.role === "Asisten" && (
                <Route path="/" element={<JadwalLab />} />
              )}
              {userData?.role === "Asisten" && (
                <Route path="/penilaian" element={<Penilaian />} />
              )}
              {userData?.role === "Asisten" && (
                <Route path="/input-nilai/:kelas_id" element={<InputNilai />} />
              )}
              {userData?.role === "Asisten" && (
                <Route path="/sertifikat" element={<Sertifikat />} />
              )}

              {/* </Route> */}

              {/* Laboran Routes */}
              {userData?.role === "Laboran" && (
                <Route path="/" element={<JadwalLab />} />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/data-user" element={<DataUser />} />
              )}
              {userData?.role === "Laboran" && (
                <Route
                  exact
                  path="/data-user/edit-user/:id"
                  element={<EditUser />}
                />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/data-laboran" element={<DataLaboran />} />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/tambah-laboran" element={<AddLaboran />} />
              )}
              {userData?.role === "Laboran" && (
                <Route
                  exact
                  path="/edit-laboran/:nip"
                  element={<EditLaboran />}
                />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/data-asisten" element={<DataAsisten />} />
              )}
              {userData?.role === "Laboran" && (
                <Route
                  exact
                  path="/data-asisten/edit-asisten/:id"
                  element={<EditAsisten />}
                />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/program" element={<Program />} />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/tambah-program" element={<AddProgram />} />
              )}
              {userData?.role === "Laboran" && (
                <Route
                  exact
                  path="/edit-program/:id"
                  element={<EditProgram />}
                />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/kehadiran" element={<Kehadiran />} />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/presensi" element={<Presensi />} />
              )}
              {userData?.role === "Laboran" && (
                <Route
                  exact
                  path="/piket/:kelas_id"
                  element={<DetailKehadiran />}
                />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/validasi" element={<Validasi />} />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/status/:nim" element={<Status />} />
              )}
              {userData?.role === "Laboran" && (
                <Route exact path="/register" element={<Register />} />
              )}
              {userData?.role === "Laboran" && (
                <Route path="/pengumuman" element={<Pengumuman />} />
              )}
              {userData?.role === "Laboran" && (
                <Route path="/tambah-pengumuman" element={<AddPengumuman />} />
              )}
              {userData?.role === "Laboran" && (
                <Route
                  exact
                  path="/edit-pengumuman/:id"
                  element={<EditPengumuman />}
                />
              )}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}

        <footer id="footer" className="sticky-bottom">
          <Footer />
        </footer>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
