import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="d-flex align-items-center justify-content-between p-4 shadow position-relative" style={{ height: "150px" }}>
      <i className="fas fa-search fs-3 text-secondary"></i>
      
      <div className="position-absolute start-50 translate-middle-x text-center">
        <Link to="/">
          <img src="/public/imagenesProject/logo.png" alt="Logo ReceList" className="d-block mx-auto" style={{ height: "110px" }} />
        </Link>
        <div className="fs-3 fw-bold">ReceList</div>
      </div>
      
      <div>
        <Link to="/login" className="btn btn-outline-primary me-2 fs-5">Iniciar sesión</Link>
        <Link to="/register" className="btn btn-primary fs-5">Registrarse</Link>
      </div>
    </header>
  );
};

export default Header;
