import Container from 'react-bootstrap/Container';

const Lab = () => {
  return (
    <>
    <section id="teams" className="block teams-block">
      <Container fluid>
        <div className="title-holder">
          <h2>JADWAL HARI INI</h2>
          <hr/>
          <div className="subtitle">LAB TIF</div>
        </div>
        <table class="table" style={{ backgroundColor:"#063554", color:"white", borderRadius:"10px"}}>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Mata Kuliah</th>
              <th scope="col">Asisten</th>
              <th scope="col">Ruangan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        </Container>
    </section>
    </>
  )
}

export default Lab