import { useState } from "react";
import { Link } from "react-router-dom";
import EditPerfil from "./editPerfil";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <header className="d-flex align-items-center justify-content-between p-4 shadow position-relative" style={{ height: "150px" }}>
        <i className="bi bi-search fs-3 text-secondary"></i>

        <div className="position-absolute start-50 translate-middle-x text-center">
          <Link to="/">
            <img src="/imagenesProject/logo.png" alt="Logo ReceList" className="d-block mx-auto" style={{ height: "110px" }} />
          </Link>
          <div className="fs-3 fw-bold">ReceList</div>
        </div>


        {/* Panel de no registrado */}
        {/* <div>
        <Link to="/login" className="btn btn-outline-primary me-2 fs-5">Iniciar sesión</Link>
        <Link to="/register" className="btn btn-primary fs-5">Registrarse</Link>
      </div> */}



        <div className="ms-auto header-elements">
          <ul className="navbar-nav d-flex flex-row ms-auto mb-0 gap-4">
            <li className="nav-item d-flex align-items-center">
              <Link to="/projectAdmin" className="nav-link active">
                <i className="bi bi-gear fs-1"></i> {/* Panel de admin */}
              </Link>
              <Link to="/listRece" className="ms-4">
                <img src="/imagenesProject/descarga.png" alt="Icono de Cocina" style={{ width: "80px" }} />
              </Link>
            </li>

            {/* Dropdown funcional */}
            <li className="nav-item dropdown position-relative">
              <button
                className="nav-link border-0 bg-transparent p-0"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src="https://i.pinimg.com/736x/68/e1/bd/68e1bdeb37a23ce848f5ec2bf280d68e.jpg"
                  alt="Perfil"
                  width="70"
                  className="rounded-circle"
                />
              </button>

              {/* Mostrar el menú solo si showDropdown es true */}
              {showDropdown && (
                <ul className="dropdown-menu show position-absolute" style={{ left: "-100px", width: "150px" }}>
                  <li className="text-dark text-center p-2">
                    <p>user@email.com</p>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button type="button" className="dropdown-item" onClick={() => setShowModal(true)}>
                      Editar perfil
                    </button>
                  </li>
                  <li><a className="dropdown-item" href="/listRece"></a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="/">Cerrar sesión</a></li>
                </ul>

                
              )}
            </li>
          </ul>
        </div>
      </header>

      {/* Modal de Edición de Perfil */}
      <EditPerfil showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Header;