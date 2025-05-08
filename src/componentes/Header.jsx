import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import EditPerfil from "./editPerfil";
import { ls } from "./funciones";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef(null);

  const [usuario, setUsuario] = useState({
    imagen: '',
    nombre: '',
    rol: ''
  });

  useEffect(() => {
    const usuarioGuardado = ls.getUsuario();
    setUsuario(usuarioGuardado || { imagen: '', nombre: '', rol: '' });
  }, []);

  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]);

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    setShowDropdown(false);
  };

  const haySesion = usuario && usuario.nombre;

  return (
    <>
      <header className="d-flex align-items-center justify-content-between p-4 shadow position-relative" style={{ height: "150px" }}>
        <i
          className="bi bi-search fs-3 text-secondary"
          style={{ cursor: "pointer" }}
          onClick={toggleSearch}
        ></i>

        <div
          className={`position-absolute start-50 translate-middle-x text-center transition-opacity ${searchActive ? "opacity-0" : "opacity-100"}`}
          style={{ transition: "opacity 0.5s ease" }}
        >
          <Link to="/">
            <img src="/imagenesProject/logo.png" alt="Logo ReceList" className="d-block mx-auto" style={{ height: "110px" }} />
          </Link>
          <div className="fs-3 fw-bold">ReceList</div>
        </div>

        {!searchActive && (
          <div className="ms-auto header-elements">
            {haySesion ? (
              <ul className="navbar-nav d-flex flex-row ms-auto mb-0 gap-4">
                <li className="nav-item d-flex align-items-center">

                {usuario.rol === "admin" && (
                  <Link to="/projectAdmin" className="nav-link active">
                    <i className="bi bi-gear fs-1"></i>
                  </Link>
                )}  
                     <Link to="/listRece" className="ms-4">
                     <img src="/imagenesProject/descarga.png" alt="" style={{ width: "55px" }} />
                   </Link>
                </li>

                <li className="nav-item dropdown position-relative">
                  <button
                    className="nav-link border-0 bg-transparent p-0"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <img
                      src={usuario.imagen}
                      alt="Perfil"
                      width="70"
                      height="70"
                      className="rounded-circle"
                    />
                  </button>

                  {showDropdown && (
                    <ul className="dropdown-menu show position-absolute" style={{ left: "-100px", width: "180px" }}>
                      <li className="text-dark text-center p-2">
                        <p className="mb-0 fw-bold">{usuario.nombre}</p>
                        <small className="text-muted">{usuario.rol}</small>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button type="button" className="dropdown-item" onClick={() => setShowModal(true)}>
                          Editar perfil
                        </button>
                      </li>
                      <li><Link to={"/listRece"} className="dropdown-item">Recetas</Link></li>
                      {usuario.rol === "admin" && (
                      <li><Link to={"/projectAdmin"} className="dropdown-item">Admin Panel</Link></li>
                      )}
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="/">Cerrar sesión</a></li>
                    </ul>
                  )}
                </li>
              </ul>
            ) : (
              <div className="d-flex gap-3">
                <Link to="/login" className="btn btn-outline-primary">Iniciar sesión</Link>
                <Link to="/register" className="btn btn-primary">Registrarse</Link>
              </div>
            )}
          </div>
        )}

        {searchActive && (
          <input
            type="text"
            ref={searchInputRef}
            className="form-control position-absolute top-50 start-50 translate-middle"
            placeholder="Buscar..."
            style={{
              width: "60%",
              transition: "width 0.5s ease"
            }}
          />
        )}
      </header>

      <EditPerfil showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Header;
