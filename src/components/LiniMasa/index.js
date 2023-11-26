import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const liniMasaData = [
  {
    id: 1,
    icon: 'fas fa-1',
    title: 'Pendaftaran Terbuka',
    description: 'TBC'
  },
  {
    id: 2,
    icon: 'fas fa-2',
    title: 'Penutupan Pendaftaran',
    description: 'TBC'
  },
  {
    id: 3,
    icon: 'fas fa-3',
    title: 'Upload Dokumen dan Seleksi',
    description: 'TBC'
  },
  {
    id: 4,
    icon: 'fas fa-4',
    title: 'Pengumuman',
    description: 'TBC'
  }
]

export default function LiniMasa() {
  return (
    <section id="liniMasa" className="block services-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Lini Masa Calon Asisten Lab</h2>
          <div className="subtitle">LAB TIF</div>
        </div>
        <Row>
          {
            liniMasaData.map(liniMasa => {
              return (
                <Col sm={6} className='holder' key={liniMasa.id}>
                  <div className='icon position-relative top-30 start-50 translate-middle'>
                    <i className={liniMasa.icon}></i>
                  </div>
                  <h3 className='text-center'>{liniMasa.title}</h3>
                  <p className='text-center pb-5'>{liniMasa.description}</p>
                </Col>
              );
            })
          }
        </Row>
      </Container>
    </section>
  );
}