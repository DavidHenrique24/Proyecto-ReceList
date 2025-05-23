import { Link } from 'react-router-dom';

const NuevoRece = () => {
  return (
    <main className="container px-5">
      <div className="container d-flex justify-content-between align-items-center mt-5">
        <h1 className="m-0">Crear Receta</h1>
        <Link to="/listRece">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-arrow-bar-left" style={{ fontSize: '1em' }}></i> Volver
          </button>
        </Link>
      </div>
      <br/>

      <form action="" className="form border shadow-sm p-3" noValidate>
        <div className="row mt-2">
          <div className="col-12">
            <img
              src="https://www.bbva.com/wp-content/uploads/2023/04/cocina-de-aprovechamiento.jpg"
              alt="Imagen de la receta"
              className="img-fluid mb-3"
            />
            <label className="form-label mt-2" htmlFor="urlImagen"><strong>URL Imagen: </strong></label>
            <input id="urlImagen" type="text" className="form-control" value="http://enlaceImagen.com" required />
            <div className="invalid-feedback">Por favor, ingresa una URL válida.</div>
          </div>

          <div className="col-12">
            <label className="form-label mt-2" htmlFor="nombre"><strong>Nombre de la Receta: </strong></label>
            <input required id="nombre" type="text" value="Nombre Receta" className="form-control" />
            <div className="invalid-feedback">El nombre es obligatorio.</div>

            <label className="form-label mt-2" htmlFor="descripcion"><strong>Descripción: </strong></label>
            <textarea id="descripcion" className="form-control" rows="4" required>Breve descripción de la receta.</textarea>
            <div className="invalid-feedback">La descripción es obligatoria.</div>

            <label className="form-label mt-2" htmlFor="ingredientes"><strong>Ingredientes: </strong></label>
            <textarea id="ingredientes" className="form-control" rows="4" required>Lista de ingredientes necesarios.</textarea>
            <div className="invalid-feedback">Los ingredientes son obligatorios.</div>

            <label className="form-label mt-2" htmlFor="preparacion"><strong>Preparación: </strong></label>
            <textarea id="preparacion" className="form-control" rows="6" required>Pasos para preparar la receta.</textarea>
            <div className="invalid-feedback">La preparación es obligatoria.</div>

            <label className="form-label mt-2" htmlFor="fecha"><strong>Fecha de Creación: </strong></label>
            <input id="fecha" type="date" className="form-control" required />
            <div className="invalid-feedback">Por favor, selecciona una fecha.</div>

            {/* Campo para seleccionar la categoría */}
            <label className="form-label mt-2" htmlFor="categoria"><strong>Categoría: </strong></label>
            <select id="categoria" className="form-select" required>
              <option value="">Selecciona una categoría</option>
              <option value="Plato Principal">Plato Principal</option>
              <option value="Postre">Postre</option>
              <option value="Comida Mexicana">Comida Mexicana</option>
              <option value="Entrante">Entrante</option>
              <option value="Comida Vegetariana">Comida Vegetariana</option>
            </select>
            <div className="invalid-feedback">La categoría es obligatoria.</div>

            <input type="submit" className="btn btn-success mt-3" value="Guardar Cambios" />
            <input type="submit" className="btn btn-outline-secondary mt-3" value="Cancelar" />
          </div>
        </div>
      </form>
    </main>
  );
};

export default NuevoRece;
