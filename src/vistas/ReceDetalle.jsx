import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../utils/supabase";

const ReceDetalle = () => {
  const [receta, setReceta] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [comentarioIdRespuesta, setComentarioIdRespuesta] = useState(null);
  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioEditado, setComentarioEditado] = useState("");
  const [respuestaEditando, setRespuestaEditando] = useState(null);
  const [respuestaEditada, setRespuestaEditada] = useState("");
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
      .insert([{
        comentario: nuevoComentario,
        rece_id: id,
        usu_id: usuario.id,
      }]);

    if (error) return console.error("Error al enviar comentario:", error.message);

    setNuevoComentario("");
    await obtenerComentarios();
  };

  const responderComentario = async (comentarioId) => {
    if (!respuesta.trim() || !usuario) return;

    const { error } = await supabase
      .from("comentarios")
      .insert([{
        comentario: respuesta,
        rece_id: id,
        usu_id: usuario.id,
        comentario_id: comentarioId,
      }]);

    if (error) return console.error("Error al responder comentario:", error.message);

    setRespuesta("");
    setComentarioIdRespuesta(null);
    await obtenerComentarios();
  };

  const eliminarComentario = async (comentarioId) => {
    const { error } = await supabase
      .from("comentarios")
      .delete()
      .eq("id", comentarioId);

    if (error) return console.error("Error al eliminar comentario:", error.message);
    await obtenerComentarios();
  };

  const eliminarRespuesta = async (respuestaId) => {
    const { error } = await supabase
      .from("comentarios")
      .delete()
      .eq("id", respuestaId);

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

  const editarRespuesta = async (respuestaId) => {
    if (!respuestaEditada.trim()) return;

    const { error } = await supabase
      .from("comentarios")
      .update({ comentario: respuestaEditada })
      .eq("id", respuestaId);

    if (error) return console.error("Error al editar respuesta:", error.message);

    setRespuestaEditando(null);
    setRespuestaEditada("");
    await obtenerComentarios();
  };

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

        <div className="mt-4">
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
        </div>
        <br />
        <h4 className="mb-3">Comentarios</h4>

        {comentarios.map((comentario) => (
          <div key={comentario.id} className="border p-3 rounded bg-light mb-3 d-flex">
            <img
              src={comentario.usuarios?.avatar || "https://via.placeholder.com/80"}
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
                      <i className="bi bi-reply"> Responder</i>
                    </button>
                  )}
                  {(usuario && (comentario.usu_id === usuario.id || usuario.rol === "admin")) && (
                    <>
                      <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => eliminarComentario(comentario.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => {
                        setComentarioEditando(comentario.id);
                        setComentarioEditado(comentario.comentario);
                      }}>
                        <i className="bi bi-pencil"></i>
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
            <br />
              {comentario.respuestas && comentario.respuestas.length > 0 && (
                <div className="mt-2">
                  {comentario.respuestas.map((respuestaComentario) => (
                    <div key={respuestaComentario.id} className="border p-3 rounded bg-light mb-3 d-flex">
                      <img
                        src={respuestaComentario.usuarios?.avatar || "https://via.placeholder.com/80"}
                        alt={respuestaComentario.usuarios?.nombre}
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />  
                      <div>
                        <p className="mb-1"><strong>{respuestaComentario.usuarios?.nombre}</strong></p>
                      
                        {respuestaEditando === respuestaComentario.id ? (
                          <>
                            <textarea
                              className="form-control"
                              value={respuestaEditada}
                              onChange={(e) => setRespuestaEditada(e.target.value)}
                            />
                            <button className="btn btn-success btn-sm mt-2" onClick={() => editarRespuesta(respuestaComentario.id)}>Guardar</button>
                            <button className="btn btn-secondary btn-sm mt-2" onClick={() => setRespuestaEditando(null)}>Cancelar</button>
                          </>
                        ) : (
                          <>
                          
                            <p className="mb-0 ">{respuestaComentario.comentario}</p>
                            <br />
                            {(usuario && (respuestaComentario.usu_id === usuario.id || usuario.rol === "admin")) && (
                              <>
                                <button className="btn btn-sm btn-outline-secondary " onClick={() => eliminarRespuesta(respuestaComentario.id)}>
                                  <i className="bi bi-trash"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-secondary ms-1" onClick={() => {
                                  setRespuestaEditando(respuestaComentario.id);
                                  setRespuestaEditada(respuestaComentario.comentario);
                                }}>
                                  <i className="bi bi-pencil"></i>
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ReceDetalle;
