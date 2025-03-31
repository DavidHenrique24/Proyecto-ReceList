import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="d-flex align-items-center justify-content-between p-4 shadow position-relative" style={{ height: "150px" }}>
      <i className="bi bi-search fs-3 text-secondary"></i>

      <div className="position-absolute start-50 translate-middle-x text-center">
        <Link to="/">
          <img src="/imagenesProject/logo.png" alt="Logo ReceList" className="d-block mx-auto" style={{ height: "110px" }} />
        </Link>
        <div className="fs-3 fw-bold">ReceList</div>
      </div>

      <div className="ms-auto header-elements"> 
        {/* Menú ROL */}
        <ul className="navbar-nav d-flex flex-row ms-auto mb-0 gap-4"> {/* Se añadió gap para más separación */}
          <li className="nav-item d-flex align-items-center">
            <Link to="/projectAdmin" className="nav-link active">
              <i className="bi bi-gear fs-1"></i> {/* Panel de admin */}
            </Link>
            <Link to="/listRece" className="ms-4"> {/* Espacio extra entre iconos */}
              <img src="/imagenesProject/descarga.png" alt="Icono de Cocina" style={{ width: "80px" }} />
            </Link>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" role="button">
              <img src="https://i.pinimg.com/736x/68/e1/bd/68e1bdeb37a23ce848f5ec2bf280d68e.jpg" alt="Perfil" width="70" className="rounded-circle" />
            </a>
            {/* Menú usuario */}
            <ul className="dropdown-menu me-0" style={{ left: "-100px", width: "100px" }}>
              <li className="text-dark text-center p-2">
                <p>user@email.com</p>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button type="button" className="dropdown-item">
                  Editar perfil
                </button>
              </li>
              <li><a className="dropdown-item" href="/">Otra acción</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/">Cerrar sesión</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
