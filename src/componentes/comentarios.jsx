import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

const Comentarios = ({ id, usuario }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [comentarioIdRespuesta, setComentarioIdRespuesta] = useState(null);
  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioEditado, setComentarioEditado] = useState("");

  const obtenerComentarios = async () => {
    const { data, error } = await supabase
      .from("comentarios")
      .select("*, usuarios(nombre, avatar)")
      .eq("rece_id", id)
      .order("id", { ascending: true });

    if (error) return console.error("Error al obtener comentarios:", error.message);

    const principales = data.filter(c => c.comentario_id === null);
    const respuestas = data.filter(c => c.comentario_id !== null);

    const conRespuestas = principales.map(c => ({
      ...c,
      respuestas: respuestas.filter(r => r.comentario_id === c.id),
    }));

    setComentarios(conRespuestas);
  };

  useEffect(() => {
    obtenerComentarios();
  }, [id]);

  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim() || !usuario) return;

    const { error } = await supabase
      .from("comentarios")
      .insert([{ comentario: nuevoComentario, rece_id: id, usu_id: usuario.id }]);

    if (error) return console.error("Error al enviar comentario:", error.message);

    setNuevoComentario("");
    await obtenerComentarios();
  };

  const responderComentario = async (comentarioId) => {
    if (!respuesta.trim() || !usuario) return;

    const { error } = await supabase
      .from("comentarios")
      .insert([{ comentario: respuesta, rece_id: id, usu_id: usuario.id, comentario_id: comentarioId }]);

    if (error) return console.error("Error al responder comentario:", error.message);

    setRespuesta("");
    setComentarioIdRespuesta(null);
    await obtenerComentarios();
  };

  const eliminarComentario = async (comentarioId) => {
    const { error } = await supabase.from("comentarios").delete().eq("id", comentarioId);
    if (error) return console.error("Error al eliminar comentario:", error.message);
    await obtenerComentarios();
  };

  const eliminarRespuesta = async (respuestaId) => {
    const { error } = await supabase.from("comentarios").delete().eq("id", respuestaId);
    if (error) return console.error("Error al eliminar respuesta:", error.message);
    await obtenerComentarios();
  };

  const editarComentario = async (comentarioId) => {
    if (!comentarioEditado.trim()) return;

    const { error } = await supabase
      .from("comentarios")
      .update({ comentario: comentarioEditado })
      .eq("id", comentarioId);

    if (error) return console.error("Error al editar comentario:", error.message);

    setComentarioEditando(null);
    setComentarioEditado("");
    await obtenerComentarios();
  };

  return (
    <section className="mt-4">
      <h4 className="mb-3">Escribe tu comentario</h4>
      {usuario && (
        <form onSubmit={enviarComentario} className="mt-3">
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="form-control"
          ></textarea>
          <button type="submit" className="btn btn-primary mt-2">Enviar Comentario</button>
        </form>
      )}

      <h4 className="mb-3 mt-4">Comentarios</h4>
      {comentarios.length === 0 && <p className="text-muted">No hay comentarios aún.</p>}
      {comentarios.map((comentario) => (
        <div key={comentario.id} className="border p-3 rounded bg-light mb-3 d-flex">
          <img
            src={comentario.usuarios?.avatar}
            alt={comentario.usuarios?.nombre}
            className="rounded-circle me-3"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div>
            <p className="mb-1"><strong>{comentario.usuarios?.nombre}</strong></p>
            {comentarioEditando === comentario.id ? (
              <>
                <textarea
                  className="form-control"
                  value={comentarioEditado}
                  onChange={(e) => setComentarioEditado(e.target.value)}
                />
                <button className="btn btn-success btn-sm mt-2 me-2" onClick={() => editarComentario(comentario.id)}>Guardar</button>
                <button className="btn btn-secondary btn-sm mt-2" onClick={() => setComentarioEditando(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <p className="mb-0">{comentario.comentario}</p>
                {usuario && (
                  <button className="btn btn-link p-0" onClick={() => setComentarioIdRespuesta(comentario.id)}>
                    <i className="bi bi-reply text-muted"> Responder</i>
                  </button>
                )}
                {(usuario && (comentario.usu_id === usuario.id || usuario.rol === "admin")) && (
                  <>
                    <button className="btn btn-sm ms-2 iconoRojo" onClick={() => eliminarComentario(comentario.id)}>
                      <i className="bi bi-trash "></i>
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

            {comentarioIdRespuesta === comentario.id && (
              <div className="mt-2">
                <textarea
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="form-control"
                ></textarea>
                <button
                  type="button"
                  onClick={() => responderComentario(comentario.id)}
                  className="btn btn-primary mt-2"
                >
                  Responder
                </button>
              </div>
            )}

            {comentario.respuestas?.map((respuesta) => (
              <div key={respuesta.id} className="mt-3 ms-4 border-start ps-3 d-flex">
                <img
                  src={respuesta.usuarios?.avatar}
                  alt={respuesta.usuarios?.nombre}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div>
                  <p className="mb-1"><strong>{respuesta.usuarios?.nombre}</strong></p>
                  <p className="mb-0">{respuesta.comentario}</p>
                  {(usuario && (respuesta.usu_id === usuario.id || usuario.rol === "admin")) && (
                    <button className="btn btn-sm ms-2 iconoRojo" onClick={() => eliminarRespuesta(respuesta.id)}>
                      <i className="bi bi-trash "></i>
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
