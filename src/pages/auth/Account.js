import React, { useState, useContext } from "react";
import "../assets/styles/account.css";
import Profile from "../../components/account/Profile";
import { DataContext } from "../../context/DataContext";
import Avatar from "react-avatar";
import Logout from "../../components/modal/Logout";

export default function Account() {
  const [toggleState, setToggleState] = useState(1);
  const { userLogin } = useContext(DataContext);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleSide = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <Navbar />
      <Logout showModal={showModal} setShowModal={setShowModal} />
      <div className="container-account container-fluid">
        <div className="account">
          <div className="col-lg-4 profile-side-left">
            <div className="user-profile row">
              <div className="image-profile col-lg-4">
                {userLogin?.image_url ? (
                  <Avatar src={userLogin?.image_url} id="photo-profile" />
                ) : (
                  <Avatar name={userLogin?.username} id="photo-profile" />
                )}
              </div>
              <div className="name-poin col-lg-8">
                <h1>{userLogin?.fullname}</h1>
                <p>{userLogin?.points} poin</p>
              </div>
            </div>
            <div className="sidenav-profile">
              <div className="profile-side">
                <p
                  type="button"
                  className={toggleState === 1 ? "bars active-bars" : "bars"}
                  onClick={() => toggleSide(1)}
                >
                  Profile
                </p>
              </div>
              <div className="logout-side">
                <p type="button" onClick={openModal}>
                  Logout
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-12 col-sm-12 ">
            <div className={toggleState === 1 ? "profile-right" : "content"}>
              <Profile />
            </div>
            <div className={toggleState === 2 ? "active-content" : "content"}>
            </div>
            <div className={toggleState === 3 ? "profile-right" : "content"}>
              {toggleState === 3 ? <ContactUs /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}