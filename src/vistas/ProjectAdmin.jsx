import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ProjectAdmin= () => {
  // Simulando algunos datos de recetas
  const recetas = [
    {
      id: 1,
      imagen: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/737c83a7-c1f9-4c95-8bdc-402e3c5aa011/Derivates/b033b224-6745-4914-9c25-f7f2ead80b9f.jpg',
      titulo: 'Receta de Pastel',
      descripcion: 'Deliciosa receta para hacer un pastel de chocolate.',
      autor: 'Juan Pérez',
      created_at: '2023-12-12',
    },
    {
      id: 2,
      imagen: 'https://imagenes.elpais.com/resizer/v2/3KWQUZHLQFGVRIWYQGO3A5WFD4.jpg?auth=f2d14d8886b49351024920c894e7f4b9f518886e962c654538d191ee37e30bac&width=1200',
      titulo: 'Ensalada César',
      descripcion: 'Receta fresca y saludable para ensalada César.',
      autor: 'Juanito estrella',
      created_at: '2023-12-13',

    },
    {
      id: 3,
      imagen: 'https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg',
      titulo: 'Cesar enasalada',
      descripcion: 'Receta fresca y saludable para ensalada César.',
      autor: 'Duki',
      created_at: '2023-12-13',

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
                <Link className="nav-link active" to="/projectAdmin">Recetas</Link>
              </li>
              <li className="nav-item w-50">
                <Link className="nav-link " to="/usuAdmin">Usuarios</Link>
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
                  <th>created_at</th>
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
                      <span className="form-control form-control-sm" readOnly>{receta.autor}</span>
                    </td>
                    <td>
                      <input type="date" className="form-control form-control-sm" value={receta.created_at} />
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
