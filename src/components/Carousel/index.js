import Image from 'react-bootstrap/Image';
import img1 from '../../assets/images/img1.jpg';

var heroData = [
  {
    id: 1,
    image: require('../../assets/images/img-hero1.jpg'),
    title: 'Cara Mendaftar',
   }
]

function AppCarousel() {
  return (
    <section id="home" className="hero-block" style={{ backgroundColor: "#063554" }}> 
      <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
    <div class="col-md-5 p-lg-5 mx-auto my-5">
      <h1 class="display-3 fw-bolder text-white">Cara Mendaftar</h1>
    </div>
  </div>
    </section>
  );
}

export default AppCarousel;