import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Uploader from '../../../components/uploader';
import '../../../assets/styles/pendaftaran.css'

const liniMasaData = [
  {
    id: 1,
    icon: 'fas fa-1',
    title: 'Transkrip nilai terbaru',
  },
  {
    id: 2,
    icon: 'fas fa-2',
    title: 'CV atau resume terbaru',
  },
  {
    id: 3,
    icon: 'fas fa-3',
    title: 'Surat motivasi',
  },
  {
    id: 4,
    icon: 'fas fa-4',
    title: 'Kartu tanda mahasiswa (KTM)',
  }
]

export default function Pendaftaran() {
  return (
    <section id="pendaftaran" className="block services-block">
      <Container fluid>
        <div className="title-holder mt-5">
          <h1 className='fw-bold' style={{ letterSpacing:"7px" }}>SYARAT DOKUMEN YANG DIPERLUKAN</h1>
          <div className="subtitle">LAB TIF</div>
        </div>
          {
            liniMasaData.map(liniMasa => {
              return (
                <Row className='holder' key={liniMasa.id}>
                  <div className='icon-pendaftaran' style={{ marginTop:"-60px"}}>
                    <i className={liniMasa.icon} style={{ marginLeft:"250px", marginTop:"60px"}}></i>
                  </div>
                  <h3 className='text-center'>{liniMasa.title}</h3>
                </Row>
              );
            })
          }
          <Uploader/>
      </Container>
    </section>
  );
}