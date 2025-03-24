import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <div className="overlay">
        <div className="overlay-content">
          <p className="fs-5">Explora recetas increíbles y haz las tuyas propias</p>
          <h1 className="display-1 fw-bold">
            LAS MEJORES RECETAS <br /> EN RECELIST
          </h1>
          <br />
          <Link to="/register" className="btn btn-outline-secondary text-white fs-3">
            Registrarse
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
