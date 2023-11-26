import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Testimonials from './testimonials';

function About() {

  return (
    <section id="about" className="block about-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Tentang Kami</h2>
          <div className="subtitle">Website Asisten LAB TIF</div>
        </div>
        <Row>
          <Col sm={6}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit dicta veritatis sint quidem asperiores magni eaque praesentium temporibus, magnam, eveniet consequatur possimus nihil? Nemo deserunt repudiandae soluta neque doloribus, quo!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae alias ex error distinctio laudantium recusandae, iure. Vel nisi soluta, minus consectetur reiciendis laborum, laudantium perspiciatis quos molestias quam eum.</p>
          </Col>
          <Col sm={6}>
            <Testimonials/>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;