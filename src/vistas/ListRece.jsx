import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  supabase from "../utils/supabase"; // Asegúrate de que esta ruta sea correcta

const ListRece = () => {
  const [recetas, setRecetas] = useState([]);

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

  return (
    <main className="container mt-5 px-1">
      <h1 className="text-center">Recetas</h1>

      <div className="row mt-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item w-50">
              <a className="nav-link active" href="#">Todas Las Recetas</a>
            </li>
            <li className="nav-item w-50">
              <a className="nav-link" href="#">Mis Recetas</a>
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
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control" placeholder="Buscar receta" />
              <span className="input-group-text"><i className="bi bi-x"></i></span>
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
                  <Link to={`/editRece/${receta.id}`}>
                    <button className="btn btn-sm icono"><i className="bi bi-pencil"></i></button>
                  </Link>
                  <button className="btn btn-sm ms-2 icono"><i className="bi bi-trash"></i></button>
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
