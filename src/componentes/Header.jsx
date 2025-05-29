import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditPerfil from "./editPerfil";
import { useUser } from "../componentes/userProvider";

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const userGuardado = JSON.parse(localStorage.getItem('user'));
    if (userGuardado) {
      setUser(userGuardado);
    }
  }, [setUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cerrarSesion = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const haySesion = user && user.nombre;

  return (
    <>
      <header className="d-flex align-items-center justify-content-between p-4 shadow position-relative" style={{ height: "150px" }}>
        <div className="position-absolute start-50 translate-middle-x text-center">
          <Link to="/">
            <img src="/imagenesProject/logo.png" alt="Logo ReceList" className="d-block mx-auto" style={{ height: "110px" }} />
          </Link>
          <div className="fs-3 fw-bold">ReceList</div>
        </div>

        <div className="ms-auto header-elements">
          {haySesion ? (
            <ul className="navbar-nav d-flex flex-row ms-auto mb-0 gap-4">
              <li className="nav-item d-flex align-items-center">
                {user.rol === "admin" && (
                  <Link to="/projectAdmin" className="nav-link active">
                    <i className="bi bi-gear fs-1"></i>
                  </Link>
                )}
                <Link to="/listRece" className="ms-4">
                  <img src="/imagenesProject/descarga.png" alt="" style={{ width: "55px" }} />
                </Link>
              </li>

              <li className="nav-item dropdown position-relative" ref={dropdownRef}>
                <button
                  className="nav-link border-0 bg-transparent p-0"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src={user.avatar}
                    alt="Perfil"
                    width="70"
                    height="70"
                    className="rounded-circle"
                  />
                </button>

                {showDropdown && (
                  <ul className="dropdown-menu show position-absolute" style={{ left: "-100px", width: "180px" }}>
                    
                    <li className="text-dark text-center p-2">
                      <p className="mb-0 fw-bold">{user.nombre}</p>
                      <p className="mb-0 ">{user.rol}</p>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link to={"/listRece"} className="dropdown-item">Recetas</Link></li>
                     <li>
                        <button type="button" className="dropdown-item" onClick={() => setShowModal(true)}>
                          Editar perfil
                        </button>
                      </li>
                    {user.rol === "admin" && (
                      <li><Link to={"/projectAdmin"} className="dropdown-item">Admin Panel</Link></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={cerrarSesion} href="/">Cerrar sesión</a></li>
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
      </header>

      <EditPerfil showModal={showModal} setShowModal={setShowModal} setUser={setUser} />
    </>
  );
};

export default Header;
