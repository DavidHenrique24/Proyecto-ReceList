import { useState, useRef, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import EditPerfil from "./editPerfil"; 
import { useUser } from "../componentes/userProvider"; 

// Componente principal Header
const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate(); 


  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef(null);

  // Efecto para cargar el usuario guardado en localStorage al montar el componente
  useEffect(() => {
    const userGuardado = JSON.parse(localStorage.getItem('user'));
    // Si hay un usuario guardado, actualiza el estado global
    if (userGuardado) {
      setUser(userGuardado);
    }
  }, [setUser]);

  // Efecto para cerrar el menú desplegable si se hace clic fuera de él
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

  // Función para cerrar sesión: borra el usuario y redirige al inicio
  const cerrarSesion = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  // Variable booleana para saber si hay sesión iniciada
  const haySesion = user && user.nombre;

  // Renderizado del componente
  return (
    <>
      {/* Header principal */}
      <header className="d-flex align-items-center justify-content-between p-4 shadow position-relative" style={{ height: "150px" }}>
        {/* Logo y nombre de la app, centrados */}
        <div className="position-absolute start-50 translate-middle-x text-center">
          <Link to="/">
            <img src="/imagenesProject/logo.png" alt="Logo ReceList" className="d-block mx-auto" style={{ height: "110px" }} />
          </Link>
          <div className="fs-3 fw-bold">ReceList</div>
        </div>

        {/* Elementos del header a la derecha */}
        <div className="ms-auto header-elements">
          {haySesion ? (
            // Si hay sesión, muestra el menú de usuario
            <ul className="navbar-nav d-flex flex-row ms-auto mb-0 gap-4">
              <li className="nav-item d-flex align-items-center">
                {/* Si el usuario es admin, muestra el icono de admin */}
                {user.rol === "admin" && (
                  <Link to="/projectAdmin" className="nav-link active">
                    <i className="bi bi-gear fs-1"></i>
                  </Link>
                )}
                {/* Enlace a la lista de recetas */}
                <Link to="/listRece" className="ms-4">
                  <img src="/imagenesProject/descarga.png" alt="" style={{ width: "55px" }} />
                </Link>
              </li>

              {/* Menú desplegable de usuario */}
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

                {/* Opciones del menú desplegable */}
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
                    {/* Opción de admin panel solo para admins */}
                    {user.rol === "admin" && (
                      <li><Link to={"/projectAdmin"} className="dropdown-item">Admin Panel</Link></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    {/* Opción para cerrar sesión */}
                    <li><a className="dropdown-item" onClick={cerrarSesion} href="/">Cerrar sesión</a></li>
                  </ul>
                )}
              </li>
            </ul>
          ) : (
            // Si no hay sesión, muestra botones para iniciar sesión o registrarse
            <div className="d-flex gap-3">
              <Link to="/login" className="btn btn-outline-primary">Iniciar sesión</Link>
              <Link to="/register" className="btn btn-primary">Registrarse</Link>
            </div>
          )}
        </div>
      </header>

      {/* Modal para editar el perfil */}
      <EditPerfil showModal={showModal} setShowModal={setShowModal} setUser={setUser} />
    </>
  );
};

export default Header;
