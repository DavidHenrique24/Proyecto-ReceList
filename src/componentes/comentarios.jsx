import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

// Componente que muestra y gestiona los comentarios de una receta
const Comentarios = ({ id, usuario }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [comentarioIdRespuesta, setComentarioIdRespuesta] = useState(null);
  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioEditado, setComentarioEditado] = useState("");

  // Función que obtiene los comentarios de Supabase
  const obtenerComentarios = async () => {
    const { data } = await supabase
      .from("comentarios")
      .select("*, usuarios(nombre, avatar)") // Incluye datos del usuario
      .eq("rece_id", id) // Filtra por la receta actual
      .order("id", { ascending: true }); // Ordena por ID ascendente

    // Separa comentarios principales y respuestas
    const principales = data.filter(c => c.comentario_id === null);
    const respuestas = data.filter(c => c.comentario_id !== null);

    // Añade las respuestas correspondientes a cada comentario principal
    const conRespuestas = principales.map(c => ({
      ...c,
      respuestas: respuestas.filter(r => r.comentario_id === c.id),
    }));

    // Actualiza el estado
    setComentarios(conRespuestas);
  };

  // Carga los comentarios cuando se monta el componente o cambia el ID
  useEffect(() => {
    obtenerComentarios();
  }, [id]);

  // Enviar un nuevo comentario
  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim() || !usuario) return;

    const { error } = await supabase
      .from("comentarios")
      .insert([{ comentario: nuevoComentario, rece_id: id, usu_id: usuario.id }]);

    if (error) return console.error("Error al enviar comentario:", error.message); //por si acaso

    setNuevoComentario(""); // Limpia el textarea
    await obtenerComentarios(); // Recarga los comentarios
  };

  // Responder a un comentario
  const responderComentario = async (comentarioId) => {
    if (!respuesta.trim() || !usuario) return; // Si no hay respuesta o usuario, no hace nada
    const { error } = await supabase
      .from("comentarios")
      .insert([{ comentario: respuesta, rece_id: id, usu_id: usuario.id, comentario_id: comentarioId }]);

    if (error) return console.error("Error al responder comentario:", error.message);

    setRespuesta("");
    setComentarioIdRespuesta(null);
    await obtenerComentarios();
  };

  // Eliminar un comentario principal
  const eliminarComentario = async (comentarioId) => {
    const { error } = await supabase.from("comentarios").delete().eq("id", comentarioId);
    if (error) return console.error("Error al eliminar comentario:", error.message);
    await obtenerComentarios();
  };

  // Eliminar una respuesta
  const eliminarRespuesta = async (respuestaId) => {
    const { error } = await supabase.from("comentarios").delete().eq("id", respuestaId);
    if (error) return console.error("Error al eliminar respuesta:", error.message);
    await obtenerComentarios();
  };

  // Editar un comentario
  const editarComentario = async (comentarioId) => {
    if (!comentarioEditado.trim()) return; // Si no hay texto editado, no hace nada

    const { error } = await supabase
      .from("comentarios")
      .update({ comentario: comentarioEditado })
      .eq("id", comentarioId);

    if (error) return console.error("Error al editar comentario:", error.message);

    setComentarioEditando(null); // Limpia el estado de edición
    setComentarioEditado("");
    await obtenerComentarios();
  };

  // Renderizado del componente
  return (
    <section className="mt-4">
      <h4 className="mb-3">Escribe tu comentario</h4>

      {/* Formulario para enviar un nuevo comentario */}
    
        <form onSubmit={enviarComentario} className="mt-3">
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)} // Maneja el cambio del textarea
            placeholder="Escribe tu comentario..."
            className="form-control"
          ></textarea>
          <button type="submit" className="btn btn-primary mt-2">Enviar Comentario</button>
        </form>
      
      <h4 className="mb-3 mt-4">Comentarios</h4>

      {/* Si no hay comentarios, muestra un mensaje */}
      {comentarios.length === 0 && <p className="text-muted">No hay comentarios aún.</p>}

      {/* Lista de comentarios */}
      {comentarios.map((comentario) => (
        <div key={comentario.id} className="border p-3 rounded bg-light mb-3 d-flex">
          {/* Avatar del usuario */}
          <img
            src={comentario.usuarios?.avatar} // Usa el avatar del usuario si existe
            alt=""
            className="rounded-circle me-3"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div>
            <p className="mb-1"><strong>{comentario.usuarios?.nombre}</strong></p>

            {/* Modo edición del comentario */}
            {comentarioEditando === comentario.id ? ( // Si estamos editando este comentario
              <>
                <textarea
                  className="form-control"
                  value={comentarioEditado}
                  onChange={(e) => setComentarioEditado(e.target.value)} // Maneja el cambio del textarea editado
                />
                <button className="btn btn-success btn-sm mt-2 me-2" onClick={() => editarComentario(comentario.id)}>Guardar</button>
                <button className="btn btn-secondary btn-sm mt-2" onClick={() => setComentarioEditando(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {/* Muestra el comentario */}
                <p className="mb-0">{comentario.comentario}</p>

                  <button className="btn btn-link p-0" onClick={() => setComentarioIdRespuesta(comentario.id)}>
                    <i className="bi bi-reply text-muted"> Responder</i>
                  </button>
                {/* Botones de eliminar/editar si el usuario es dueño o admin */}
                {(usuario && (comentario.usu_id === usuario.id || usuario.rol === "admin")) && (
                  <>
                    <button className="btn btn-sm ms-2 iconoRojo" onClick={() => eliminarComentario(comentario.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                    <button className="btn btn-sm ms-2" onClick={() => {
                      setComentarioEditando(comentario.id);
                      setComentarioEditado(comentario.comentario);
                    }}>
                      <i className="bi bi-pencil icono"></i>
                    </button>
                  </>
                )}
              </>
            )}

            {/* Área de respuesta */}
            {comentarioIdRespuesta === comentario.id && (
              <div className="mt-2">
                <textarea
                  value={respuesta} // Usa el estado de respuesta
                  onChange={(e) => setRespuesta(e.target.value)} // Maneja el cambio del textarea de respuesta
                  placeholder="Escribe tu respuesta..."
                  className="form-control"
                ></textarea>
                <button
                  type="button"
                  onClick={() => responderComentario(comentario.id)} // Responde al comentario actual
                  className="btn btn-primary mt-2"
                >
                  Responder
                </button>
              </div>
            )}

            {/* Mostrar las respuestas del comentario */}
            {comentario.respuestas?.map((respuesta) => (
              // Cada respuesta es un comentario anidado
              <div key={respuesta.id} className="mt-3 ms-4 border-start ps-3 d-flex"> 
                <img
                  src={respuesta.usuarios?.avatar}
                  alt=""
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div>
                  <p className="mb-1"><strong>{respuesta.usuarios?.nombre}</strong></p>
                  <p className="mb-0">{respuesta.comentario}</p>

                  {/* Botón eliminar si el usuario es el dueño o admin */}
                  {(usuario && (respuesta.usu_id === usuario.id || usuario.rol === "admin")) && (
                    <button className="btn btn-sm ms-2 iconoRojo" onClick={() => eliminarRespuesta(respuesta.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Comentarios;
