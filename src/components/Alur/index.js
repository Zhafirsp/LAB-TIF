import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import img1 from '../../assets/images/img1.jpg';

const alurPendaftaran = [
  {
    id: 1,
    icon: 'fas fa-1',
    title: 'Pengumuman lowongan asisten',
  },
  {
    id: 2,
    icon: 'fas fa-2',
    title: 'Pendaftaran calon asisten',
  },
  {
    id: 3,
    icon: 'fas fa-3',
    title: 'Mengumpulkan persyaratan dokumen',
  },
  {
    id: 4,
    icon: 'fas fa-4',
    title: 'Seleksi dan wawancara',
    },
  {
    id: 5,
    icon: 'fas fa-5',
    title: 'Pemberitahuan hasil seleksi',
    },
  {
    id: 6,
    icon: 'fas fa-6',
    title: 'Penugasan asisten',
    }
]

export default function Alur() {

  return (
    <section id="about" className="block about-block">
      <Container fluid>
        <Row>
          <Col sm={6}>
          <div className="title-holder text-start">
            <h2>Alur Pendaftaran Calon Asisten</h2>
            <div className="subtitle">Website Asisten LAB TIF</div>
         </div>
            <Image src={img1} />
          </Col>
          <Col sm={6}>
          <div className="title-holder text-start text-white">
            <h2 style={{ backgroundColor:"#FCB919", borderRadius:"15px", paddingLeft:"25px"}}>Tahapan Pendaftaran</h2>
            <br/>
         </div>
         {
            alurPendaftaran.map(alur => {
              return (
                <Row sm={2} className='holder' key={alur.id}>
                  <div className="icon ms-5">
                    <i className={alur.icon}></i>
                  </div>
                  <h3 style={{ marginLeft:"-250px" }}>{alur.title}</h3>
                  <p>{alur.description}</p>
                </Row>
              );
            })
          }
          </Col>
        </Row>
      </Container>
    </section>
  );
}
