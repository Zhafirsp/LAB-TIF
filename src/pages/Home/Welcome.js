import React from "react";
import Image from 'react-bootstrap/Image';
import img1 from '../../assets/images/img5.jpg';
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Testimonials from "../../components/testimonials";
import "../../assets/styles/homeMhs.css";

export default function Welcome () {
  return (
    <>
      {/* Header */}
      <section id="welcome" className="block welcome-block">
        <div className="container">
          <div className="row " id="welcomeH">
            <div className="col-sm-12 col-md-6 col-lg-4 polaroid-left" id="polaroid">
              <Image src={img1} alt="header" />
              <p>LAB-TIF</p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4" id="contentWH">
              <p id="headlineWH">
              <span>Selamat datang</span> <br />
                <span>Website LAB-TIF</span>
              </p>
              <p className="pb-4" id="decsWH">
              Ayo mulai mendaftar sebagai asisten LAB-TIF dengan menjadi asisten LAB-TIF kamu bisa mendapatkan pengalaman dan ilmu yang bermanfaat untuk masa depan kamu.
              </p>
              {/* Button */}
              <NavLink
                to="/mendaftar"
                className="btn btn-primary col-6 mx-auto mt-4"
                id="btn-home"
              >
                Daftar Sekarang
              </NavLink>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 polaroid-right" id="polaroid">
              <Image src={img1} alt="header" />
              <p>LAB-TIF</p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="block about-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Tentang Kami</h2>
          <div className="subtitle">Website Asisten LAB TIF</div>
        </div>
        <Row>
          <Col sm={6}>
            <p>Website LAB-TIF adalah sebuah inovasi dalam lingkungan laboratorium Teknik Informatika. 
              Dengan menyediakan akses yang mudah dan terorganisir ke berbagai informasi, dan layanan, 
              serta situs ini mendukung kegiatan belajar mengajar dalam laboratorium.</p>
            <p>Salah satu aspek terpenting dari LAB-TIF adalah menyediakan jadwal laboratorium yang terkini. 
              Asisten dapat dengan mudah mengakses jadwal ini untuk mengetahui waktu dan lokasi praktikum mereka. 
              Hal ini membantu mereka merencanakan kegian belajar mengajar mereka dengan lebih efisien dan menghindari konflik jadwal.</p>
            <p>Website ini juga mencakup informasi tentang staf laboratorium, 
              yang memungkinkan mahasiswa untuk menghubungi asisten laboratorium jika mereka memerlukan 
              bantuan selama praktikum atau memiliki pertanyaan terkait dengan eksperimen atau tugas tertentu.</p>
          </Col>
          <Col sm={6}>
            <Testimonials/>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
}