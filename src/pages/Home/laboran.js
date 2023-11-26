// import { Routes, Route, useLocation } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
// // import DataUser from '../dataUser';
// // import DataLaboran from '../dataLaboran';
// // import DataAsisten from '../LaboranPages/dataAsisten';
// // import Kehadiran from '../LaboranPages/kehadiranAsisten';
// // import Presensi from '../LaboranPages/kehadiranAsisten/presensi';
// // import Validasi from '../LaboranPages/validasiData';
// // import Status from '../LaboranPages/validasiData/status';
// // import Register from '../auth/Register';
// import Login from '../auth/Login';
// import NavAdmin from '../../components/NavigationBar/navLaboran';
// import useLogout from "../../hooks/useLogout";
// import checkLogin from "../../utils/checkLogin";
// import JadwalPraktikum from '../../components/table/jadwal';

// export default function HomeAdmin () {

//   const navigate = useNavigate();
//     const logout = useLogout();

//     const signOut = async () => {
//         await logout();
//         navigate('/login');
//     }

//   const location = useLocation();

//   const isLogin = location.pathname === "/login";


//   return (
//     <>
// {/* 
//     <header id='header'>
//      <NavAdmin/>
//      </header> */}
//      {/* {!isLogin && <NavAdmin />}
//      <Routes>
//         <Route exact path='/laboran' element={<JadwalPraktikum/>}/>
//         <Route exact path='/user' element={<DataUser/>}/>
//         <Route exact path='/laboran' element={<DataLaboran/>}/>
//         <Route exact path='/asisten' element={<DataAsisten/>}/>
//         <Route exact path='/kehadiran' element={<Kehadiran/>}/>
//         <Route exact path='/presensi' element={<Presensi/>}/>
//         <Route exact path='/validasi' element={<Validasi/>}/>
//         <Route exact path='/status' element={<Status/>}/>
//         <Route exact path='/register' element={<Register/>}/>
//       </Routes> */}
//           {/* <div className="flexGrow">
//                 <button onClick={signOut}>Sign Out</button>
//             </div> */}

//     </>
//   )
// }

