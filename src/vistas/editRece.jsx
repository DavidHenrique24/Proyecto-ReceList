import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const EditRece = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receta, setReceta] = useState(null);

  // Cargar receta al iniciar
  useEffect(() => {
    const fetchReceta = async () => {
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al cargar la receta:", error.message);
        return;
      }

      setReceta(data);
      setLoading(false);
    };

    fetchReceta();
  }, [id]);

  // Manejar cambios en los campos
  const handleChange = (e) => {
    setReceta({ ...receta, [e.target.id]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("recetas")
      .update({
        titulo: receta.titulo,
        descripcion: receta.descripcion,
        ingredientes: receta.ingredientes,
        pasos: receta.pasos,
        portada: receta.portada,
        created_at: receta.created_at,
      })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar receta:", error.message);
      return;
    }

    navigate("/listRece");
  };

  if (loading)
    return <p className="text-center">Cargando datos de la receta...</p>;
  if (!receta) return <p className="text-center">No se encontró la receta</p>;

  return (
    <main className="container px-5">
      <div className="container d-flex justify-content-between align-items-center mt-5">
        <h1 className="m-0">Editar {receta.titulo}</h1>
        <Link to="/listRece">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-arrow-bar-left" style={{ fontSize: "1em" }}></i>{" "}
            Volver
          </button>
        </Link>
      </div>
      <br />

      <form
        onSubmit={handleSubmit}
        className="form border shadow-sm p-3"
        noValidate
      >
        <div className="row mt-2">
          <div className="col-12 ">
            <img
              src={receta.portada}
              alt=""
              className="img-fluid mb-3 mx-auto d-block"
              style={{ width: "1000px" }}
            />

            <br />
            <label className="form-label mt-2" htmlFor="portada">
              <strong>URL Imagen:</strong>
            </label>
            <input
              id="portada"
              type="text"
              className="form-control"
              value=""
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label mt-2" htmlFor="titulo">
              <strong>Nombre de la Receta:</strong>
            </label>
            <input
              id="titulo"
              type="text"
              value={receta.titulo}
              onChange={handleChange}
              className="form-control"
              required
            />

            <label className="form-label mt-2" htmlFor="descripcion">
              <strong>Descripción:</strong>
            </label>
            <textarea
              id="descripcion"
              className="form-control"
              rows="4"
              value={receta.descripcion}
              onChange={handleChange}
              required
            ></textarea>

            <label className="form-label mt-2" htmlFor="ingredientes">
              <strong>Ingredientes:</strong>
            </label>
            <textarea
              id="ingredientes"
              className="form-control"
              rows="4"
              value={receta.ingredientes}
              onChange={handleChange}
              required
            ></textarea>

            <label className="form-label mt-2" htmlFor="pasos">
              <strong>Preparación:</strong>
            </label>
            <textarea
              id="pasos"
              className="form-control"
              rows="6"
              value={receta.pasos}
              onChange={handleChange}
              required
            ></textarea>

            <label className="form-label mt-2" htmlFor="created_at">
              <strong>Fecha de Creación:</strong>
            </label>
            <input
              id="created_at"
              type="date"
              className="form-control"
              value={receta.created_at?.split("T")[0]}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-success mt-3">
              Guardar Cambios
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

export default EditRece;
