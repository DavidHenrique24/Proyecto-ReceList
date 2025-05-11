import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import supabase from "../utils/supabase"

const ReceDetalle = () => {
  const [receta, setReceta] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [comentarios, setComentarios] = useState([])  // Para almacenar comentarios
  const { id } = useParams()

  // Obtener usuario logueado
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Error al obtener usuario:", error.message)
        return
      }
      setUsuario(data?.user)
    }
    getUser()
  }, [])

  // Obtener receta
  useEffect(() => {
    const obtenerReceta = async () => {
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error al obtener la receta:", error.message)
        return
      }

      setReceta(data)
    }

    obtenerReceta()
  }, [id])

  // Obtener comentarios
  useEffect(() => {
    const obtenerComentarios = async () => {
   const { data, error } = await supabase
  .from("comentarios")
  .select("*, usuarios(nombre, avatar)") 
  .eq("rece_id", id)
  .order("id", { ascending: true })

      if (error) {
        console.error("Error al obtener comentarios:", error.message)
        return
      }

      // Separar principales y respuestas
      // Filtrar comentarios principales (sin comentario_id)
      // y respuestas (con comentario_id)
      const comentariosPrincipales = data.filter(c => c.comentario_id === null)
      // Filtrar respuestas (con comentario_id)
      // y asociarlas a sus respectivos comentarios
      const respuestas = data.filter(c => c.comentario_id !== null)

      // Asociar respuestas a sus comentarios
      const comentariosConRespuestas = comentariosPrincipales.map(comentario => ({
        ...comentario,
        respuestas: respuestas.filter(r => r.comentario_id === comentario.id)
      }))

      setComentarios(comentariosConRespuestas)
    }

    
    obtenerComentarios()
  }, [id])

  if (!receta) return <p className="text-center">No se encontró la receta</p>

  return (
    <main className="container px-3 bg">
      <div className="container w-75">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Link to="/listRece">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-arrow-bar-left" style={{ fontSize: "1em" }}> Volver</i>
            </button>
          </Link>

          {/* Botón de editar y eliminar receta */}
          {receta.user_id === usuario.id || usuario.role === "admin" && (
            <div className="d-flex align-items-end">
              <Link to={`/editRece/${id}`}>
                <button className="btn btn-sm ms-2 icono" style={{ fontSize: "1.25rem" }}>
                  <i className="bi bi-pencil"></i>
                </button>
              </Link>
              <button className="btn btn-sm ms-2 icono" style={{ fontSize: "1.25rem" }}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}
        </div>

        <br />
        <h1 className="mt-2">{receta.titulo}</h1>
        <br />

        <div className="row mt-2">
          <div className="col-12 text-center mb-3">
            <img src={receta.portada} alt={receta.titulo} className="img-fluid w-100 mx-auto rounded" />
          </div>
          <div className="col-12">
            <p><strong>Fecha de creación:</strong> {new Date(receta.created_at).toLocaleDateString()}</p>
            <div className="col-12 col-md-8">
              <p><strong>Descripción:</strong> {receta.descripcion}</p>
              <p><strong>Ingredientes:</strong></p>
              <p><li>{receta.ingredientes}</li></p>
              <p><strong>Pasos:</strong></p>
              <p>{receta.pasos}</p>
              <br />
            </div>
          </div>
        </div>

        {/* Comentarios */}
        <div className="mt-4">
          <h4 className="mb-3">Comentarios</h4>
          {comentarios.length > 0 ? (
            comentarios.map(comentario => (
              <div key={comentario.id} className="border p-3 rounded bg-light mb-3">
                <div className="d-flex">
                  <img
                    src={comentario.usuarios?.avatar|| "default-avatar.png"}
                    alt=""
                    className="rounded-circle me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div>
                    <p className="mb-1">
                      <strong>{comentario.usuarios?.nombre || "Usuario"}</strong>{" "}
                      <span className="text-muted" style={{ fontSize: "0.9em" }}>– {new Date(comentario.created_at).toLocaleDateString()}</span>
                    </p>
                    <p className="mb-0">{comentario.comentario}</p>
                  </div>
                </div>

                {/* Respuestas */}
                {comentario.respuestas.length > 0 && (
                  <div className="ms-4 mt-2">
                    {comentario.respuestas.map(respuesta => (
                      <div key={respuesta.id} className="p-2 rounded bg-white border d-flex">
                        <img
                          src={respuesta.usuarios?.avatar || "default-avatar.png"}
                          alt=""
                          className="rounded-circle me-2"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                        <div>
                          <p className="mb-1">
                            <strong>{respuesta.usuarios?.nombre || "Usuario"}</strong>{" "}
                            <span className="text-muted" style={{ fontSize: "0.85em" }}>– Respuesta</span>
                          </p>
                          <p className="mb-0">{respuesta.comentario}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No hay comentarios aún. Sé el primero en comentar.</p>
          )}
        </div>
        <br />
      </div>
    </main>
  )
}

export default ReceDetalle
