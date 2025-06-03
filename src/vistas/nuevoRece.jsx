import { useState, useEffect } from "react"; // Importa hooks de React
import { Link, useNavigate } from "react-router-dom"; // Importa componentes y hooks de React Router
import supabase from "../utils/supabase"; // Importa la instancia de Supabase configurada

// Componente funcional para crear una nueva receta
const NuevoRece = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Estado para almacenar el usuario autenticado
  const [usuario, setUsuario] = useState(null);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    urlImagen:
      "https://img.freepik.com/vector-premium/imagen-vectorial-icono-album-puede-utilizar-fotografia_120816-250318.jpg", // Imagen por defecto
    nombre: "",
    descripcion: "",
    ingredientes: "",
    preparacion: "",
  });

  // Hook de efecto para obtener el usuario autenticado al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(); // Obtiene el usuario autenticado

      if (error) {
        console.error("Error obteniendo usuario:", error.message);
        return;
      }

      setUsuario(user); // Guarda el usuario en el estado
    };

    fetchUser();
  }, []);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Inserta la nueva receta en la base de datos de Supabase
    const { error } = await supabase.from("recetas").insert([
      {
        portada: formData.urlImagen,
        titulo: formData.nombre,
        descripcion: formData.descripcion,
        ingredientes: formData.ingredientes,
        pasos: formData.preparacion,
        user_id: usuario.id, // Relaciona la receta con el usuario actual
      },
    ]);

    if (error) {
      alert("Error al guardar la receta: " + error.message);
      return;
    }

    navigate("/listRece"); // Redirige a la lista de recetas
  };

  // Renderiza el formulario y la interfaz
  return (
    <main className="container px-5">
      {/* Encabezado con botón para volver */}
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

      {/* Formulario para crear la receta */}
      <form onSubmit={handleSubmit} className="form border shadow-sm p-3">
        <div className="row mt-2 mb-3">
          <div className="col-12">
            {/* Imagen de portada */}
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
            {/* Campo para la URL de la imagen */}
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
            {/* Campo para el nombre de la receta */}
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

            {/* Campo para la descripción */}
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

            {/* Campo para los ingredientes */}
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

            {/* Campo para la preparación */}
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

            {/* Botón para crear la receta */}
            <button type="submit" className="btn btn-success mt-3">
              Crear Receta
            </button>
            {/* Botón para cancelar y volver */}
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

export default NuevoRece; // Exporta el componente para su uso en otras partes de la app
