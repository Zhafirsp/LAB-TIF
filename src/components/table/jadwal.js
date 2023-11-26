import Container from 'react-bootstrap/Container';
import {PiPencilSimpleBold} from 'react-icons/pi';
import {BiTrashAlt} from 'react-icons/bi';

export default function JadwalPraktikum () {
  return (
    <>
    <section id="teams" className="block teams-block">
      <Container fluid>
        <div className="title-holder">
          <h2 className='fw-bold'>JADWAL SEMESTER</h2>
          <hr/>
          <div className="subtitle">LAB TIF</div>
        </div>
        <table className="table table-bordered text-center" style={{ backgroundColor:"#063554", color:"white", borderRadius:"10px"}}>
          <thead>
            <tr>
              <th className='text-center' colSpan={"11"}><h3 className='fw-bold'>Senin</h3></th>
            </tr>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Mulai</th>
              <th scope="col">Selesai</th>
              <th scope="col">Kode MK</th>
              <th scope="col">Mata Kuliah</th>
              <th scope="col">SKS</th>
              <th scope="col">Kelas</th>
              <th scope="col">Ruang</th>
              <th scope="col">Dosen</th>
              <th scope="col">Asisten</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor:"#fff", color:"black", borderRadius:"10px"}}>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <button type="button" className="btn btn-warning mx-2 text-white"><PiPencilSimpleBold/></button>
                <button type="button" className="btn btn-danger"><BiTrashAlt/></button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <button type="button" className="btn btn-warning mx-2 text-white"><PiPencilSimpleBold/></button>
                <button type="button" className="btn btn-danger"><BiTrashAlt/></button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <button type="button" className="btn btn-warning mx-2 text-white"><PiPencilSimpleBold/></button>
                <button type="button" className="btn btn-danger"><BiTrashAlt/></button>
              </td>
            </tr>
          </tbody>
        </table>
        </Container>
    </section>
    </>
  )
}

