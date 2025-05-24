import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../utils/supabase";

const ListRece = () => {
  const [recetas, setRecetas] = useState([]);
  // Estado para el término de búsqueda del usuario
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para almacenar las recetas filtradas según la búsqueda o filtros
  const [recetasEncontradas, setRecetasEncontradas] = useState([]);
  // Estado para indicar si se está viendo todas las recetas
  const [filtroActivo, setFiltroActivo] = useState("todas");
  // Estado para guardar el usuario autenticado
  const [usuario, setUsuario] = useState(null);

  // useEffect que se ejecuta al montar el componente
  useEffect(() => {
    // Función async para obtener el usuario y las recetas
    const fetchUsuarioYRecetas = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error al obtener usuario:", userError.message);
        return;
      }

      setUsuario(user);

      const { data } = await supabase.from("recetas").select("*");
       setRecetas(data);
      
    };

    fetchUsuarioYRecetas();
  }, []);

  useEffect(() => {
    const recetasFiltradas =
      filtroActivo === "mias" && usuario
        ? recetas.filter((receta) => receta.user_id === usuario.id)
        : recetas;

    // Si no hay nada en el buscador, muestra todas las recetas filtradas
    if (searchTerm.trim() === "") {
      setRecetasEncontradas(recetasFiltradas);
    } else {
      // Si hay búsqueda, filtra las recetas cuyo título empiece por el término
      const encontradas = recetasFiltradas.filter((receta) =>
        receta.titulo.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setRecetasEncontradas(encontradas);
    }
  }, [searchTerm, recetas, filtroActivo, usuario]); // Dependencias del efecto

  // Función para eliminar una receta
  const deleteReceta = async (id) => {
    const { error } = await supabase.from("recetas").delete().eq("id", id);

    // Muestra error en consola si ocurre
    if (error) {
      console.error("Error al eliminar receta:", error.message);
    } else {
      // Si se elimina correctamente, actualiza la lista sin la receta eliminada
      const nuevasRecetas = recetas.filter((receta) => receta.id !== id);
      setRecetas(nuevasRecetas);
    }
  };




  // Renderizado del componente
  return (
    <main className="container mt-5 px-1">
      <h1 className="text-center">Recetas</h1>

      {/* Navegación para seleccionar filtro */}
      <div className="row mt-4">
        <div className="col-12">
         <ul className="nav nav-tabs w-200">
  <li className="nav-item">
    <button
      className={`nav-link ${filtroActivo === "todas" ? "active" : ""}`}
      onClick={() => setFiltroActivo("todas")}
    >
      Todas Las Recetas
    </button>
  </li>

{usuario &&
    (usuario.rol === "chef" ||
      recetas.some((receta) => receta.user_id === usuario.id)) && (
      <li className="nav-item w-50">
        <button
          className={`nav-link ${filtroActivo === "mias" ? "active" : ""}`}
          onClick={() => setFiltroActivo("mias")}
        >
          Mis Recetas
        </button>
      </li>
  )}
</ul>

        </div>
      </div>

      {/* Barra de búsqueda y botón para subir receta */}
      <div className="border border-top-0 p-3">
        <div className="row">
      {usuario &&
        (usuario.rol === "chef" ||
          recetas.some((receta) => receta.user_id === usuario.id)) && (
          <div className="col-12 col-sm-4 mb-3">
            <Link to={"/nuevoRece"}>
              <button className="btn btn-primary w-100">Subir receta</button>
            </Link>
          </div>
        )}

      {/* Input para buscar recetas */}
      <div className="d-flex col-12 col-sm-8 mb-3">
        <div className="input-group flex-nowrap">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar receta"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSearchTerm("")}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
    </div>

        {/* Muestra recetas encontradas */}
        <div className="row mt-3">
          {recetasEncontradas.length > 0 ? (
            recetasEncontradas.map((receta) => (
              <div key={receta.id} className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  {/* Imagen de la receta con link al detalle */}
                  <Link to={`/receDetalle/${receta.id}`}>
                    <img
                       src={receta.portada || "/imagenesProject/fotoDefault.jpg"}
                      className="card-img-top"
                      alt=""
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  </Link>
    
                  <div className="card-body">
                    <h5 className="card-title">{receta.titulo}</h5>
                    <p className="card-text">{receta.descripcion}</p>
                    <p className="text-muted">
                      <small>{new Date(receta.created_at).toLocaleDateString()}</small>
                    </p>
                  </div>
                
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <br />
                    {/* Si el usuario actual es el autor o un admin, puede editar y borrar */}
{usuario && (receta.user_id === usuario.id || usuario.role === "admin") && (
  <div className="d-flex gap-1">
    <Link to={`/editRece/${receta.id}`}>
      <button className="btn btn-sm icono">
        <i className="bi bi-pencil"></i>
      </button>
    </Link>
    <button
      className="btn btn-sm icono"
      onClick={() => deleteReceta(receta.id)}
    >
      <i className="bi bi-trash"></i>
    </button>
  </div>
)}

                  </div>
                </div>
              </div>
            ))
          ) : (
            // Mensaje si no se encuentran recetas
            <div className="text-center" style={{ marginBottom: "500px" }}>
              <p>No se encontraron recetas.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// Exporta el componente para usarlo en otras partes
export default ListRece;