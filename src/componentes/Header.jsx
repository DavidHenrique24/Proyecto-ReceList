import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import EditPerfil from "./editPerfil";

const Header = () => {
  // Estado para controlar la visibilidad del dropdown del perfil
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Estado para controlar la visibilidad del modal de edición de perfil
  const [showModal, setShowModal] = useState(false);
  
  // Estado para controlar si el input de búsqueda está activo (visible)
  const [searchActive, setSearchActive] = useState(false);
  
  // Referencia al input de búsqueda para poder enfocarlo cuando sea necesario
  const searchInputRef = useRef(null);

  // Efecto para autoenfocar el input cuando searchActive sea true
  useEffect(() => {
    // Si el input de búsqueda está activo y la referencia al input es válida, se enfoca
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]); // El efecto se ejecuta cada vez que 'searchActive' cambia

  // Función para alternar la visibilidad del input de búsqueda
  const toggleSearch = () => {
    setSearchActive(!searchActive); // Cambia el estado de búsqueda
    setShowDropdown(false); // Cierra el dropdown si está abierto cuando se activa el buscador
  };

  return (
    <>
      <header className="d-flex align-items-center justify-content-between p-4 shadow position-relative" style={{ height: "150px" }}>
        {/* Icono de búsqueda: al hacer click, activa o desactiva el input de búsqueda */}
        <i
          className="bi bi-search fs-3 text-secondary"
          style={{ cursor: "pointer" }}
          onClick={toggleSearch} // Activa el buscador al hacer clic
        ></i>

        {/* Logo central que se oculta cuando el buscador está activo */}
        <div
          className={`position-absolute start-50 translate-middle-x text-center transition-opacity ${searchActive ? "opacity-0" : "opacity-100"}`}
          style={{ transition: "opacity 0.5s ease" }}
        >
          <Link to="/">
            <img src="/imagenesProject/logo.png" alt="Logo ReceList" className="d-block mx-auto" style={{ height: "110px" }} />
          </Link>
          <div className="fs-3 fw-bold">ReceList</div>
        </div>

        {/* Panel de usuario que se oculta cuando el buscador está activo */}
        {!searchActive && (
          <div className="ms-auto header-elements">
            <ul className="navbar-nav d-flex flex-row ms-auto mb-0 gap-4">
              <li className="nav-item d-flex align-items-center">
                <Link to="/projectAdmin" className="nav-link active">
                  <i className="bi bi-gear fs-1"></i>
                </Link>
                <Link to="/listRece" className="ms-4">
                  <img src="/imagenesProject/descarga.png" alt="" style={{ width: "55px" }} />
                </Link>
              </li>

              {/* Dropdown del perfil */}
              <li className="nav-item dropdown position-relative">
                <button
                  className="nav-link border-0 bg-transparent p-0"
                  onClick={() => setShowDropdown(!showDropdown)} // Alterna la visibilidad del dropdown
                >
                  <img
                    src="https://i.pinimg.com/736x/68/e1/bd/68e1bdeb37a23ce848f5ec2bf280d68e.jpg"
                    alt="Perfil"
                    width="70"
                    className="rounded-circle"
                  />
                </button>

                {/* Mostrar el dropdown solo si showDropdown es true */}
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
                    <li><Link to={"/listRece"} className="dropdown-item">Recetas</Link></li>
                    <li><Link to={"/projectAdmin"} className="dropdown-item">Admin Panel</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="/">Cerrar sesión</a></li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        )}

        {/* Input de búsqueda que solo se muestra cuando searchActive es true */}
        {searchActive && (
          <input
            type="text"
            ref={searchInputRef} // Referencia para poder enfocarlo
            className="form-control position-absolute top-50 start-50 translate-middle"
            placeholder="Buscar..."
            style={{
              width: "60%", // Establece el ancho del input
              transition: "width 0.5s ease" // Transición suave para el ancho
            }}
          />
        )}
      </header>

      {/* Modal de Edición de Perfil: se muestra solo si showModal es true */}
      <EditPerfil showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Header;
