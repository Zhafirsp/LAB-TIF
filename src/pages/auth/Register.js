import { useRef, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
// import {API} from '../../api/axios';
import Image from "react-bootstrap/Image";
import img1 from "../../assets/images/img1.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { postRegisterApi } from "../../api/auth/authApi";
import Validation from "../../utils/validation";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const [success, setSuccess] = useState(false);

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPass, setConfirmPass] = useState("");
  // const [role, setRole] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
    role: "Mahasiswa",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("username", data.username);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("confirmPass", data.confirmPass);
    formdata.append("role", data.role);

    try {
      const result = await postRegisterApi(formdata);
      console.log(result);

      if (result?.status === 201) {
        setLoading(false);
        navigate("/data-user");
      }
      // navigate('/user-data');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  function handleValidation(e) {
    setErrors(Validation(data));
  }

  // const onRegister = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await postRegisterApi({ formData })
  //     console.log(result?.data?.data);
  //     setLoading(false);
  //     // setUsername('');
  //     // setPassword('');
  //     // setRole('');
  //   } catch (err) {
  //     if (!err?.response) {
  //       toast("No Server Response", {
  //         type: "error",
  //       });
  //     } else if (err.response?.status === 409) {
  //       toast("Username Taken", {
  //         type: "error",
  //       });
  //     } else {
  //       toast("Registration  Failed", {
  //         type: "error",
  //       });
  //       console.log(err?.response.data);
  //       console.log(err?.response.status);
  //       console.log(err?.response.headers);
  //     }
  //   }
  // };

  // const onRegister = async () => {
  //   try {
  //     if (!form.username) {
  //       toast("Please input username !", {
  //         type: "error",
  //         theme: "colored",
  //       });
  //     }
  //     if (!form.password) {
  //       toast("Please input password !", {
  //         type: "error",
  //         theme: "colored",
  //       });
  //     }
  //     if (form.password !== form.confirmPass) {
  //       toast("Please input the same password !", {
  //         type: "error",
  //         theme: "colored",
  //       });
  //     }
  //     if (form.username && form.password && form.confirmPass ) {
  //       const { data } = await API().post("v1/auth/register",JSON.stringify({form}));
  //       console.log(data);
  //       navigate.push("/");
  //     }
  //   } catch (error) {
  //     console.log(error?.response?.data);
  //     if (error?.response?.data?.error) {
  //       toast(error?.response?.data?.error, {
  //         type: "error",
  //         theme: "colored",
  //       });
  //     } else if (error?.response?.data?.errors) {
  //       const errors = error?.response?.data?.errors;
  //       errors.forEach((err) => {
  //         toast(err, {
  //           type: "error",
  //           theme: "colored",
  //         });
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <ToastContainer />
      <div
        className="form-floating"
        style={{ marginTop: "200px", marginBottom: "100px" }}
      >
        <Container fluid>
          <Row
            className="d-flex align-items-center rounded"
            style={{ padding: "50px", boxShadow: "3px 3px 3px 3px #EBEBEB" }}
          >
            <Col sm={6}>
              <Image src={img1} className="rounded" />
            </Col>
            <Col sm={6}>
              <h2 className="text-center fs-2 fw-semibold">REGISTER</h2>
              {/* <form
                className="login-form"
                // onSubmit={(e) => {
                //   handleSubmit(e);
                //   handleValidation();
                // }}
              >
                
              </form> */}

              <div className="mb-3">
                <label className="form-label input" htmlFor="username">
                  Username
                </label>
                <input
                  // value={username}
                  // onChange={(e) => setUsername(e.target?.value)}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  type="username"
                  placeholder="NIP/NPM"
                  className="form-control"
                  id="username"
                  name="username"
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label input" htmlFor="username">
                  Email
                </label>
                <input
                  // value={username}
                  // onChange={(e) => setUsername(e.target?.value)}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="email"
                  name="email"
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </div>
              <div className="row g-2">
                <div className="col-md">
                  <div className="mb-3">
                    <label className="form-label input" htmlFor="password">
                      Password
                    </label>
                    <input
                      // value={password}
                      // onChange={(e) => setPassword(e.target?.value)}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      type="password"
                      placeholder="********"
                      className="form-control"
                      id="password"
                      name="password"
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="col-md">
                  <div className="mb-3">
                    <label
                      className="form-label input"
                      htmlFor="confirm password"
                    >
                      {" "}
                      Konfirmasi Password
                    </label>
                    <input
                      // value={confirmPass}
                      // onChange={(e) => setConfirmPass(e.target?.value)}
                      onChange={(e) =>
                        setData({ ...data, confirmPass: e.target.value })
                      }
                      type="password"
                      placeholder="********"
                      className="form-control"
                      id="confirm password"
                      name="confirm password"
                    />
                    {errors.confirmPass && (
                      <p style={{ color: "red" }}>{errors.confirmPass}</p>
                    )}
                  </div>
                </div>
              </div>
              <label className="form-label input" htmlFor="role">
                Role
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={data.role}
                // onChange={(e) => setRole(e.target?.value)}
                onChange={(e) => setData({ ...data, role: e.target.value })}
              >
                {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Asisten">Asisten</option>
                <option value="Laboran">Laboran</option>
              </select>

              <button
                type="submit"
                className="btn btn-primary col-12 mx-auto mt-4"
                id="submit"
                onClick={() => {
                  handleValidation();
                  handleSubmit();
                }}
              >
                {loading ? "Loading..." : "REGISTER"}
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
