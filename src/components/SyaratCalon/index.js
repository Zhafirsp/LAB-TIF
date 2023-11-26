import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Testimonials from '../testimonials'

const syaratUmum = [
  {
    id: 1,
    icon: 'fas fa-1',
    title: 'Mahasiswa Teknik Informatika',
  },
  {
    id: 2,
    icon: 'fas fa-2',
    title: 'Memiliki kemauan untuk belajar dan mengajar',
  },
  {
    id: 3,
    icon: 'fas fa-3',
    title: 'Memiliki salah satu bidang yang dikuasai dalam bidang Teknik Informatika',
  }
]

export default function SyaratCalon() {
  return (
    <section id="syarat" className="block services-block">
      <Container fluid>
        <Row g={0}>
            <Col sm={6} className='holder'>
              <div className="title-holder text-start">
                  <h2>Syarat Umum Calon Asisten</h2>
                  <div className="subtitle">LAB TIF</div>
                </div>
                {
            syaratUmum.map(syarat => {
              return (
                <Row sm={2} className='holder' key={syarat.id}>
                  <div className="icon">
                    <i className={syarat.icon}></i>
                  </div>
                  <h3 className='mt-3'>{syarat.title}</h3>
                  <p>{syarat.description}</p>
                </Row>
                
              );
            })
          }
          <a style={{ width:"400px" }} className="btn btn-primary" href='/pendaftaran'>Daftar Disini </a>
              
                </Col>
          <Col>
                <Testimonials/>
              </Col>
        </Row>
      </Container>
    </section>
  );
}

