import { Link } from "react-router-dom";

const ReceDetalle = () => {
  return (
    <main className="container px-3 bg">
      <div className="container w-75">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Link to="/listRece">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-arrow-bar-left " style={{ fontSize: '1em' }}>  Volver</i>
              
            </button>
          </Link>

          {/* Solo aparece en caso de ser chef */}
          <div className="d-flex align-items-end">
            <Link to={"/editRece"}>
              <button className="btn btn-sm ms-2 icono" style={{ fontSize: '1.25rem' }}>
                <i className="bi bi-pencil"></i>
              </button>
              </Link>
              <button className="btn btn-sm ms-2 icono" style={{ fontSize: '1.25rem' }}>
                <i className="bi bi-trash"></i>
              </button>
          
          </div>
        </div>
        <br />
        <br />
        <h1 className="mt-2">Pollo De Brasa</h1>
        <br />

        <div className="row mt-2">
          <div className="col-12 text-center mb-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCha23q54YIVZKJ3huCfgAN2n1XF_UTNbqw&s"
              alt="Pollo De Brasa"
              className="img-fluid w-100 mx-auto rounded"
            />
          </div>
          <div className="col-12">
            <p>
              <strong>Fecha: </strong>
              <span id="fecha">12/12/2023</span>
            </p>
            <p>
              <strong>Autor: </strong>
              <span id="autor">Juan Pérez</span>
            </p>
            {/* Categoría */}
            <p>
              <strong>Categoría: </strong>
              <span id="categoria">Plato Principal</span> {/* Cambia esta categoría según corresponda */}
            </p>
  
            {/* Detalles de la receta */}
            <div className="col-12 col-md-8">
              <p>
                <strong>Descripción: </strong>
                <span id="descripcion">
                  El pollo de brasa es un plato tradicional de la gastronomía peruana, cocinado a la brasa
                  con un aderezo especial. Es una receta deliciosa, perfecta para acompañar con papas fritas
                  o ensalada.
                </span>
              </p>

              {/* Ingredientes */}
              <p>
                <strong>Ingredientes: </strong>
                <ul id="ingredientes">
                  <li>1 Pollo entero</li>
                  <li>3 dientes de ajo</li>
                  <li>1 cucharada de comino</li>
                  <li>1 cucharada de paprika</li>
                  <li>1/2 taza de jugo de limón</li>
                  <li>Pimienta al gusto</li>
                  <li>Sal al gusto</li>
                </ul>
              </p>

              {/* Preparación */}
              <p>
                <strong>Preparación: </strong>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, laborum error mollitia eius delectus reiciendis nulla laboriosam ipsum veritatis, dolorum quasi minima voluptatum! Iusto dignissimos inventore maiores sed laboriosam eligendi.

                </p>
               
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />



      </div>
      {/* Comentarios */}

 
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
  );
};

export default ReceDetalle;
