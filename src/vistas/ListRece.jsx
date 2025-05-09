import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../utils/supabase";

const ListRece = () => {
  const [recetas, setRecetas] = useState([]);

  // Fetch recetas desde Supabase
  useEffect(() => {
    const fetchRecetas = async () => {
      const { data, error } = await supabase
        .from("recetas")
        .select("*");

      if (error) {
        console.error("Error al obtener recetas:", error.message);
      } else {
        setRecetas(data);
      }
    };

    fetchRecetas();
  }, []);

  // Función para eliminar receta
  const deleteReceta = async (id) => {
    const { error } = await supabase
      .from("recetas")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar receta:", error.message);
    } else {
      setRecetas(recetas.filter((receta) => receta.id !== id));
    }
  };

  // Función para dar like a la receta
  const handleLike = async (id, currentLikes) => {
    const { error } = await supabase
      .from("recetas")
      .update({ likes: currentLikes + 1 })
      .eq("id", id);

    if (error) {
      console.error("Error al dar like a la receta:", error.message);
    } else {
      setRecetas(
        recetas.map((receta) =>
          receta.id === id
            ? { ...receta, likes: currentLikes + 1 }
            : receta
        )
      );
    }
  };

  return (
    <main className="container mt-5 px-1">
      <h1 className="text-center">Recetas</h1>

      <div className="row mt-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item w-50">
              <a className="nav-link active" href="#">
                Todas Las Recetas
              </a>
            </li>
            <li className="nav-item w-50">
              <a className="nav-link" href="#">
                Mis Recetas
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border border-top-0 p-3">
        <div className="row">
          <Link to={"/nuevoRece"}>
            <div className="col-12 col-sm-4 mb-3">
              <button className="btn btn-primary w-100">Subir receta</button>
            </div>
          </Link>
          <div className="d-flex col-12 col-sm-8 mb-3">
            <div className="input-group flex-nowrap">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar receta"
              />
              <span className="input-group-text">
                <i className="bi bi-x"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {recetas.map((receta) => (
            <div key={receta.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <Link to={`/receDetalle/${receta.id}`}>
                  <img
                    src={receta.portada}
                    className="card-img-top"
                    alt={receta.titulo}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{receta.titulo}</h5>
                  <p className="card-text">{receta.descripcion}</p>
                  <p className="text-muted">
                    <small>{new Date(receta.created_at).toLocaleString()}</small>
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-sm icono"
                    onClick={() => handleLike(receta.id, receta.likes)}
                  >
                    {receta.likes} <i className="bi bi-heart"></i>
                  </button>
                  <Link to={`/editRece/${receta.id}`}>
                    <button className="btn btn-sm icono">
                      <i className="bi bi-pencil"></i>
                    </button>
                  </Link>
                  <button
                    className="btn btn-sm ms-2 icono"
                    onClick={() => deleteReceta(receta.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ListRece;
