const ReceDetalle = () => {
  return (
    <main className="container px-3 bg">
      <div className="container w-75">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-arrow-bar-left" style={{ fontSize: '1em' }}></i>
            Volver
          </button>

          {/* Solo aparece en caso de ser chef */}
          <div className="d-flex align-items-end">
            <a href="">
              <button className="btn btn-sm ms-2 icono" style={{ fontSize: '1.25rem' }}>
                <i className="bi bi-pencil"></i>
              </button>
            </a>
            <a href="">
              <button className="btn btn-sm ms-2 icono" style={{ fontSize: '1.25rem' }}>
                <i className="bi bi-trash"></i>
              </button>
            </a>
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
            <br />
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
                <ol id="preparacion">
                  <li>Marinar el pollo con ajo, comino, paprika, jugo de limón, sal y pimienta durante al menos 2 horas.</li>
                  <li>Precalentar el horno a 180°C.</li>
                  <li>Colocar el pollo en la parrilla o en el horno y cocinar durante 1 hora o hasta que esté bien dorado.</li>
                  <li>Servir con papas fritas o ensalada al gusto.</li>
                </ol>
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </main>
  );
};

export default ReceDetalle;
