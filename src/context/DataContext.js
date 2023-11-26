import React, { createContext, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import {API} from "../api/axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  // Users
  const [users, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useState([]);
  const [laboran, setLaboran] = useState([]);
  const [asisten, setAsisten] = useState([]);
  const [pendaftaran, setPendaftaran] = useState([]);
  const [auth, setAuth] = useState({});


  useEffect(() => {
    getUserLogin();
    getUsers();
    getLaboran();
    getAsisten();
    getPendaftaran();
  }, []);

  // Get data Profile
  const getUserLogin = async () => {
    const { data } = await API().get("/v1/profile");
    setUserLogin(data?.dataUser);
  };

  // Get all user
  const getUsers = async () => {
    const { data: dataUser } = await API().get("/v1/users");
    setUsers(dataUser?.users);
  };

// Get all laboran
  const getLaboran = async () => {
    const { data: dataLaboran } = await API().get("/v1/laborans");
    setLaboran(dataLaboran?.laboran);
  };

  // Get all asisten
  const getAsisten = async () => {
    const { data: dataAsisten } = await API().get("/v1/asistens");
    setAsisten(dataAsisten?.asisten);
  };

  // Get all pendaftaran
  const getPendaftaran = async () => {
    const { data: dataPendaftaran } = await API().get("/v1/pendaftaran");
    setPendaftaran(dataPendaftaran?.pendaftaran);
  };

//   // useEffect(async () => {
//   //   const arrPath = pathname?.split("/");
//   //   const newId = Number(arrPath[arrPath.length - 1]);
//   //   await getUserById(newId);
//   //   await getLaboranByNIP(newNIP);
//   //   await getAsistenById(newId);
//   //   await getPendaftaran();
//   //   await getPendaftaranByNIM(newNIM);
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   // useEffect(async () => {
//   //   const arrPath = pathname?.split("/");
//   //   const newId = Number(arrPath[arrPath.length - 1]);

//   //   await getUserById(newId);
//   //   await getLaboranByNIP(newNIP);
//   //   await getAsistenById(newId);
//   //   await getPendaftaranByNIM(newNIM);
//   // }, [pathname]);

//   // const getUserById = async (id) => {
//   //   if (id) {
//   //     const { data: dataUsersId } = await axios().get(`//v1/users/${id}`);
//   //     setUsers(dataUsersId.users);
//   //   }
//   // };

//   // const getLaboranByNIP = async (nip) => {
//   //   if (nip) {
//   //     const { data: dataLaboranNip } = await axios().get(`//v1/laborans/${nip}`);
//   //     setLaboran(dataLaboranNip.laboran);
//   //   }
//   // };

//   // const getAsistenById = async (id) => {
//   //   if (id) {
//   //     const { data: dataAsistenId } = await axios().get(`//v1/Asistens/${id}`);
//   //     setAsisten(dataAsistenId.asisten);
//   //   }
//   // };

//   // const getPendaftaranByNIM = async (nim) => {
//   //   if (nim) {
//   //     const { data: dataPendaftaranNim } = await axios().get(`//v1/pendaftaran/${nim}`);
//   //     setPendaftaran(dataPendaftaranNim.pendaftaran);
//   //   }
//   // };
    
    

  return (
    <>
      <DataContext.Provider
        value={{
          auth, 
          setAuth,
          userLogin,
          users,
          laboran,
          asisten,
          pendaftaran,
        }}
        >  
        {children}
        </DataContext.Provider>
      </>
    );
  };
  
  export { DataProvider, DataContext };
