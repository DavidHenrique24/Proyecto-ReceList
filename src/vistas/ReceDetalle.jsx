import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import  supabase  from "../utils/supabase"; // Ajusta la ruta si es necesario

const ReceDetalle = () => {
  const [receta, setReceta] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams() // Para cargar receta por ID

  useEffect(() => {
    const obtenerReceta = async () => {
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error al obtener la receta:", error.message)
        setLoading(false)
        return
      }

      setReceta(data)
      setLoading(false)
    }

    obtenerReceta()
  }, [id])

  if (loading) return <p className="text-center">Cargando receta...</p>
  if (!receta) return <p className="text-center">No se encontró la receta</p>

  return (
    <main className="container px-3 bg">
      <div className="container w-75">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Link to="/listRece">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-arrow-bar-left" style={{ fontSize: "1em" }}>
                {" "}
                Volver
              </i>
            </button>
          </Link>
          
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
        </div>

        <br />
        <h1 className="mt-2">{receta.titulo}</h1>
        <br />

        <div className="row mt-2">
          <div className="col-12 text-center mb-3">
            <img
              src={receta.portada}
              alt={receta.titulo}
              className="img-fluid w-100 mx-auto rounded"
            />
          </div>
          <div className="col-12">
            <p><strong>Fecha de creación:</strong> {new Date(receta.created_at).toLocaleString()}</p>

            <div className="col-12 col-md-8">
              <p><strong>Descripción: </strong> {receta.descripcion}</p>

              <p>
                <strong>Ingredientes:</strong>
                <ul>
                  {receta.ingredientes?.split("\n").map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </p>

              <p>
                <strong>Pasos:</strong>
                <p>
                 {receta.pasos}
                </p>
              </p>
            </div>
          </div>
        </div>

  
      </div>



      <div className="mt-4">
  {/* Comentario principal */}
  <div className="mt-4">
  <h4 className="mb-3">Comentarios</h4>
  <div className="border p-3 rounded bg-light mb-3 d-flex">
    <img 
      src="https://www.directvsports.com/__export/1738067807821/sites/dsports/img/2025/01/28/copia_de_dise-o_sin_t-tulo_-9-.png_1917050570.png" 
      alt="Lucía Gómez" 
      className="rounded-circle me-3" 
      style={{ width: "80px", height: "80px", objectFit: "cover" }} 
    />
    <div>
      <p className="mb-1"><strong>La cabra</strong> <span className="text-muted" style={{ fontSize: "0.9em" }}>– 22/04/2025</span></p>
      <p className="mb-0">¡Esta receta me salvó la cena! Lo hice para mi familia y todos quedaron encantados. Le agregué un toque de ají amarillo y quedó espectacular 😋🔥</p>
    </div>
  </div>
</div>

  <div className="border p-3 rounded bg-light mb-3 d-flex">
    <img 
      src="https://randomuser.me/api/portraits/women/68.jpg" 
      alt="Lucía Gómez" 
      className="rounded-circle me-3" 
      style={{ width: "80px", height: "80px", objectFit: "cover" }} 
    />
    <div>
      <p className="mb-1"><strong>Lucía Gómez</strong> <span className="text-muted" style={{ fontSize: "0.9em" }}>– 22/04/2025</span></p>
      <p className="mb-2">¡Esta receta me salvó la cena! Lo hice para mi familia y todos quedaron encantados. Le agregué un toque de ají amarillo y quedó espectacular 😋🔥</p>

      {/* Respuesta al comentario */}
      <div className="ms-4 mt-2 p-2 rounded bg-white border d-flex">
        <img 
          src="https://randomuser.me/api/portraits/men/45.jpg" 
          alt="Chef Responde" 
          className="rounded-circle me-2" 
          style={{ width: "50px", height: "50px", objectFit: "cover" }} 
        />
        <div>
          <p className="mb-1"><strong>Chef Rodrigo</strong> <span className="text-muted" style={{ fontSize: "0.85em" }}>– Respuesta</span></p>
          <p className="mb-0">¡Qué bueno que te gustó, Lucía! Me encanta el toque de ají amarillo, le da ese picante especial 😄🔥</p>
        </div>
      </div>
  </div>
</div>

</div>
<br />
<br />
    </main>
  )
}

export default ReceDetalle;
