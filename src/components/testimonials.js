import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

var testimonialsData = [
  {
    id: 1,
    name: 'Muhammad Zhafir Sunandy Pramana',
    description: 'Menjadi asisten sangatlah seru kita bisa belajar bersama mengenai materi yand diajarkan, public speaking dan juga cara mengajar yang baik dan benar',
    designation: 'TIF19'
  },
  {
    id: 2,
    name: 'Tsania Warda Listianisari',
    description: 'Menjadi asisten sangan menyenangkan selama saya menjadi asisten saya mendapatkan pengalaman yang luar biasa',
    designation: 'TIF19'
  }
]

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Client testimonials</h2>
          <div className="subtitle">what client says about us</div>
        </div>
        <Carousel controls={false}>
          {
            testimonialsData.map(testimonials => {
              return (
                <Carousel.Item key={testimonials.id}>
                  <blockquote>
                    <p>{testimonials.description}</p>
                    <cite>
                      <span className='name'>{testimonials.name}</span>
                      <span className='designation'>{testimonials.designation}</span>
                    </cite>
                  </blockquote>             
                </Carousel.Item>
              );
            })
          }
        </Carousel>
      </Container>
    </section>
  );
}

export default Testimonials;