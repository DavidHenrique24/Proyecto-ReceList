import React, { useState } from 'react';

const ProjectAdmin= () => {
  // Simulando algunos datos de recetas
  const recetas = [
    {
      id: 1,
      imagen: 'https://randomuser.me/api/portraits/men/1.jpg',
      titulo: 'Receta de Pastel',
      descripcion: 'Deliciosa receta para hacer un pastel de chocolate.',
      autor: 'Juan Pérez',
      fecha: '2023-12-12',
    },
    {
      id: 2,
      imagen: 'https://randomuser.me/api/portraits/men/2.jpg',
      titulo: 'Ensalada César',
      descripcion: 'Receta fresca y saludable para ensalada César.',
      autor: 'Juanito estrella',
      fecha: '2023-12-13',

    },
    {
      id: 3,
      imagen: 'https://image.europafm.com/clipping/cmsimages02/2023/02/23/2FD6FEED-0AC4-44A0-B698-B02B33535C80/duki_104.jpg?crop=720,720,x341,y0&width=1200&height=1200&optimize=low&format=webply',
      titulo: 'Cesar enasalada',
      descripcion: 'Receta fresca y saludable para ensalada César.',
      autor: 'Duki',
      fecha: '2023-12-13',

    },
    
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <div className="container mt-5 px-1">
          <h1 className="mt-5">Panel de administración de Recetas</h1>

          {/* Tabs de navegación */}
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li className="nav-item w-50">
                <Link className="nav-link" to="/receAdmin">Recetas</Link>
              </li>
              <li className="nav-item w-50">
                <Link className="nav-link active" to="/usuAdmin">Usuarios</Link>
              </li>
            </ul>
          </div>
        </div>

          {/* Buscador */}
          <div className="row">
            <div className="d-flex col-12 col-md-6 mb-3">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar receta"
                  aria-label="Buscador"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
          </div>

          {/* Tabla de recetas */}
          <div className="col-12" style={{ overflowX: 'auto' }}>
            <table className="table table-hover align-middle mt-3" style={{ minWidth: '1200px' }}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Autor</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recetas.map((receta) => (
                  <tr key={receta.id}>
                    <td>
                      <div
                        className="containerImagen"
                        style={{
                          backgroundImage: `url(${receta.imagen})`,
                          width: '90px',
                          height: '90px',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      ></div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={receta.titulo}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={receta.descripcion}
                      />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option value="1">Juan Pérez</option>
                        <option value="2">María García</option>
                      </select>
                    </td>
                    <td>
                      <input type="date" className="form-control form-control-sm" value={receta.fecha} />
                    </td>
                    <td>
                      <button className="btn btn-sm btn-success">Editar</button>
                      <i className="btn btn-sm btn-outline-danger bi bi-trash3 ms-2"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectAdmin;
