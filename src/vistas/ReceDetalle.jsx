import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import Comentarios from "../componentes/comentarios";

const ReceDetalle = () => {
  const [receta, setReceta] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) return console.error("Error al obtener usuario auth:", error.message);

      if (data?.user) {
        const { data: usuarioData, error: usuarioError } = await supabase
          .from("usuarios")
          .select("*")
          .eq("user_id", data.user.id)
          .single();
        if (usuarioError) return console.error("Error al obtener datos del usuario:", usuarioError.message);
        setUsuario(usuarioData);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const obtenerReceta = async () => {
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .eq("id", id)
        .single();
      if (error) return console.error("Error al obtener la receta:", error.message);
      setReceta(data);
    };
    obtenerReceta();
  }, [id]);

  if (!receta) return <p className="text-center">No se encontró la receta</p>;

  return (
    <main className="container px-3 bg">
      <div className="container w-75">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Link to="/listRece">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-arrow-bar-left"> Volver</i>
            </button>
          </Link>

          {usuario && (receta.user_id === usuario.user_id ) && (
            <div className="d-flex align-items-end">
              <Link to={`/editRece/${id}`}>
                <button className="btn btn-sm ms-2 icono">
                  <i className="bi bi-pencil"></i>
                </button>
              </Link>
              <button className="btn btn-sm ms-2 icono">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}
        </div>

        <h1 className="mt-4">{receta.titulo}</h1>

        <div className="row mt-2">
          <div className="col-12 text-center mb-3">
            <img src={receta.portada} alt={receta.titulo} className="img-fluid w-100 mx-auto rounded" />
          </div>
          <div className="col-12">
            <p><strong>Fecha de creación:</strong> {new Date(receta.created_at).toLocaleDateString()}</p>
            <p><strong>Descripción:</strong> {receta.descripcion}</p>
            <p><strong>Ingredientes:</strong></p>
            <ul><li>{receta.ingredientes}</li></ul>
            <p><strong>Pasos:</strong></p>
            <p>{receta.pasos}</p>
          </div>
        </div>

        <Comentarios id={id} usuario={usuario} />
      </div>
    </main>
  );
};

export default ReceDetalle;
