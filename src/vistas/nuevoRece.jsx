import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const NuevoRece = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  const [formData, setFormData] = useState({
    urlImagen:
      "https://img.freepik.com/vector-premium/imagen-vectorial-icono-album-puede-utilizar-fotografia_120816-250318.jpg",
    nombre: "",
    descripcion: "",
    ingredientes: "",
    preparacion: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error obteniendo usuario:", error.message);
        return;
      }

      setUsuario(user);
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("recetas").insert([
      {
        portada: formData.urlImagen,
        titulo: formData.nombre,
        descripcion: formData.descripcion,
        ingredientes: formData.ingredientes,
        pasos: formData.preparacion,
        user_id: usuario.id,
      },
    ]);

    if (error) {
      alert("Error al guardar la receta: " + error.message);
      return;
    }

    navigate("/listRece");
  };

  return (
    <main className="container px-5">
      <div className="container d-flex justify-content-between align-items-center mt-5">
        <h1 className="m-0">Crear Receta</h1>
        <Link to="/listRece">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-arrow-bar-left" style={{ fontSize: "1em" }}></i>{" "}
            Volver
          </button>
        </Link>
      </div>
      <br />

      <form onSubmit={handleSubmit} className="form border shadow-sm p-3">
        <div className="row mt-2 mb-3">
          <div className="col-12">
            <img
              src={formData.urlImagen}
              alt=""
              className="img-fluid text-center mb-3 mx-auto d-block rounded"
              style={{
                width: 600,
                height: 400,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <label className="form-label mt-2" htmlFor="urlImagen">
              <strong>URL Imagen: </strong>
            </label>
            <input
              id="urlImagen"
              type="text"
              className="form-control"
              value={formData.urlImagen}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label mt-2" htmlFor="nombre">
              <strong>Nombre de la Receta: </strong>
            </label>
            <input
              id="nombre"
              type="text"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <label className="form-label mt-2" htmlFor="descripcion">
              <strong>Descripción: </strong>
            </label>
            <textarea
              id="descripcion"
              className="form-control"
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
              required
            ></textarea>

            <label className="form-label mt-2" htmlFor="ingredientes">
              <strong>Ingredientes: </strong>
            </label>
            <textarea
              id="ingredientes"
              className="form-control"
              rows="4"
              value={formData.ingredientes}
              onChange={handleChange}
              required
            ></textarea>

            <label className="form-label mt-2" htmlFor="preparacion">
              <strong>Preparación: </strong>
            </label>
            <textarea
              id="preparacion"
              className="form-control"
              rows="6"
              value={formData.preparacion}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="btn btn-success mt-3">
              Crear Receta
            </button>
            <button
              type="button"
              onClick={() => navigate("/listRece")}
              className="btn btn-outline-secondary mt-3 ms-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default NuevoRece;
