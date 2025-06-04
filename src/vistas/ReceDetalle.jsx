import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import Comentarios from '../componentes/comentarios.jsx';


const ReceDetalle = () => {
  // Estado para guardar los datos de la receta
  const [receta, setReceta] = useState(null);

  // Estado para guardar los datos del usuario autenticado
  const [usuario, setUsuario] = useState(null);

  // Obtiene el parámetro `id` de la URL (la id de la receta)
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para redireccionar

  // useEffect para obtener el usuario autenticado al cargar el componente
  useEffect(() => {
    const getUser = async () => {
      // Obtiene el usuario autenticado desde Supabase
      const { data, error } = await supabase.auth.getUser();


      if (data?.user) {
        // Si hay usuario, busca sus datos en la tabla `usuarios`
        const { data: usuarioData, error: usuarioError } = await supabase
          .from("usuarios")
          .select("*")
          .eq("user_id", data.user.id)
          .single(); // obtiene solo un registro

        if (usuarioError) return console.error("Error al obtener datos del usuario:", usuarioError.message);
        setUsuario(usuarioData); // guarda los datos del usuario
      }
    };
    getUser(); // llama a la función
  }, []);

  // useEffect para obtener los datos de la receta con el ID de la URL
  useEffect(() => {
    const obtenerReceta = async () => {
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .eq("id", id)
        .single(); // obtiene la receta con el id especificado

      if (error) return console.error("Error al obtener la receta:", error.message);
      setReceta(data); // guarda los datos de la receta
    };
    obtenerReceta();
  }, [id]);

  // Función para eliminar la receta
  const eliminarReceta = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta receta?")) return;
    const { error } = await supabase
      .from("recetas")
      .delete()
      .eq("id", id);
    if (error) {
      alert("Error al eliminar la receta: " + error.message);
    } else {
      navigate("/listRece");
    }
  };

  // Mientras no se haya cargado la receta, muestra mensaje
  if (!receta) return <p className="text-center" style={{ marginBottom: "1800px" }}></p>;

  return (
    <main className="container px-3 bg">
      <div className="container w-75">
        {/* Botón para volver y botones de editar/borrar si el usuario es el autor */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Link to="/listRece">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-arrow-bar-left"> Volver</i>
            </button>
          </Link>

          {/* Solo muestra editar y eliminar si el usuario es el creador de la receta */}
          {usuario && (receta.user_id === usuario.user_id) && (
            <div className="d-flex align-items-end">
              <Link to={`/editRece/${id}`}>
                <button className="btn btn-sm ms-2 icono">
                  <i className="bi bi-pencil"></i>
                </button>
              </Link>
              <button className="btn btn-sm ms-2 iconoRojo" onClick={eliminarReceta}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}
        </div>

        {/* Título de la receta */}
        <h1 className="mt-4">{receta.titulo}</h1>

        {/* Imagen de portada de la receta */}
        <div className="row mt-2">
          <div className="col-12 text-center mb-3">
            <img
              src={receta.portada || "/imagenesProject/fotoDefault.jpg"}
              alt=""
              className="mx-auto rounded"
              style={{
                width: "800px",
                height: "500px",
                objectFit: "cover"
              }}
            />
          </div>

          {/* Información detallada de la receta */}
          <div className="col-12">
            <p><strong>Fecha de creación:</strong> {new Date(receta.created_at).toLocaleDateString()}</p>
            <p><strong>Descripción:</strong> {receta.descripcion}</p>
            <p><strong>Ingredientes:</strong></p>
            <ul><li>{receta.ingredientes}</li></ul>
            <p><strong>Pasos:</strong></p>
            <p>{receta.pasos}</p>
          </div>
        </div>

        {/* Componente de comentarios (le pasa el id y el usuario) */}
        <Comentarios id={id} usuario={usuario} />
      </div>
    </main>
  );
};

export default ReceDetalle;
