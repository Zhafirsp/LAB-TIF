import React, { useContext } from "react";
import "../../assets/styles/account.css";
import { GiTwoCoins } from "react-icons/gi";
import { FaTree } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Avatar from "react-avatar";
import { Cloudinary } from "../../api/cloudinary/cloudinaryApi";
// import { useAuth } from "../../../context/AuthContext";
import { getProfileApi, getProfileEditApi } from "../../api/profile/profileApi";

const { REACT_APP_CLOUD_NAME_CLOUDINARY, REACT_APP_UPLOAD_PRESET_CLOUDINARY } =
  process.env;

export default function Profile() {
  const [userLogin, setUserLogin] = useState([]);
  // const { authTokens } = useAuth();
  const navigate = useNavigate();
  console.log(userLogin, "log");

  const getUserLogin = async () => {
    const { data } = await getProfileApi();
    setUserLogin(data?.dataUser);
  };

  const [fileImage, setFileImage] = useState(null);
  const [fileBg, setFileBg] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imageUrl, setImageUrl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [bgUrl, setBgUrl] = useState(null);

  const [newProfile, setNewProfile] = useState({
    fullname: "",
    username: "",
    email: "",
    image_url: "",
  });

  const onChangeFileImage = (e) => {
    const files = e?.target?.files;
    setFileImage(files[0]);
  };

  const onChangeFileBg = (e) => {
    const files = e?.target?.files;
    setFileBg(files[0]);
  };

  const onHandleSave = async () => {
    try {
      const payloadProfile = {
        fullname: newProfile?.fullname
          ? newProfile?.fullname
          : userLogin?.fullname,
        username: newProfile?.username
          ? newProfile?.username
          : userLogin?.username,
        email: newProfile?.email ? newProfile?.email : userLogin?.email,
        image_url: userLogin?.image_url,
      };

      if (fileImage) {
        const payloadImg = new FormData();
        payloadImg.append("file", fileImage);
        payloadImg.append("upload_preset", REACT_APP_UPLOAD_PRESET_CLOUDINARY);
        payloadImg.append("cloud_name", REACT_APP_CLOUD_NAME_CLOUDINARY);
        const { data: dataPict } = await Cloudinary().post("/", payloadImg);
        setImageUrl(dataPict);

        payloadProfile.image_url = dataPict?.url;
      }
      if (fileBg) {
        const payloadBg = new FormData();
        payloadBg.append("file", fileBg);
        payloadBg.append("upload_preset", REACT_APP_UPLOAD_PRESET_CLOUDINARY);
        payloadBg.append("cloud_name", REACT_APP_CLOUD_NAME_CLOUDINARY);

        const { data: dataBg } = await Cloudinary().post("/", payloadBg);
        setBgUrl(dataBg);

        payloadProfile.background_url = dataBg.url;
      }
      // eslint-disable-next-line no-unused-vars
      const { data } = await toast.promise(
        getProfileEditApi(payloadProfile),
        {
          pending: "Penyimpanan profile baru sedang diproses",
          success: "Login dulu ya agar penyimpananmu tersimpan dengan baik!",
          error: "Gagal menyimpan perubahan data profile baru",
        },
        {
          theme: "colored",
        }
      );
      setNewProfile(payloadProfile);

      navigate.push("/");
      window.location.reload()
    } catch (error) {
      console.log(error?.response?.data?.errors[0]);
      toast(
        error?.response?.data?.errors[0] ||
          error?.response?.message ||
          "Internal Server Error",
        { type: "error", theme: "colored" }
      );
    }
  };


  return (
    <>
      <div className="container-account container-fluid">
        <div className="row account">
          <div className="col-lg-8 profile-right">
            <div className="profile-container">
              <div className="row id-profile">
                <div className="profile-picture edit-profile-pict">
                  <div className="camera-profile">
                    <AiFillCamera
                      className="icons-camera-profile"
                      onClick={(_) =>
                        document.getElementById("input-image").click()
                      }
                    />
                    <input
                      type="file"
                      className="custom-file-input"
                      id="input-image"
                      onChange={(e) => onChangeFileImage(e)}
                      style={{ opacity: 0 }}
                    />
                  </div>
                  {userLogin?.image_url ? (
                    <Avatar src={userLogin?.image_url} id="img-edit-profile" />
                  ) : (
                    <Avatar name={userLogin?.username} id="img-edit-profile" />
                  )}
                  {/* <img src={userLogin?.image_url} alt="" /> */}
                </div>
                <div className="form-edit-profile">
                  <form id="form-edit-profile">
                    <div className="form-group">
                      <label for="formGroupExampleInput">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder={userLogin?.fullname}
                        onChange={(e) =>
                          setNewProfile({
                            ...newProfile,
                            fullname: e.target?.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label for="formGroupExampleInput">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder={userLogin?.username}
                        onChange={(e) =>
                          setNewProfile({
                            ...newProfile,
                            username: e.target?.value,
                          })
                        }
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label for="formGroupExampleInput">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder={userLogin?.email}
                        onChange={(e) =>
                          setNewProfile({
                            ...newProfile,
                            email: e.target?.value,
                          })
                        }
                      />
                    </div>
                    <div className="btn-save-profile">
                      <button type="button" onClick={() => onHandleSave()}>
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}