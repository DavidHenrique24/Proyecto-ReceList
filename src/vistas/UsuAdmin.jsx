import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UsuAdmin = () => {
  const [usuarios, setUsuarios] = useState([
    {
      imagen: 'https://randomuser.me/api/portraits/men/1.jpg',
      nombre: 'Juan',
      email: 'juan.perez@example.com',
      rol: 'Admin',
      fechaRegistro: '2023-01-15',
      activo: 'Sí',
    },
    {
      imagen: 'https://randomuser.me/api/portraits/men/2.jpg',
      nombre: 'María',
      email: 'maria.garcia@example.com',
      rol: 'Chef',
      fechaRegistro: '2023-02-18',
      activo: 'No',
    },
  ]);

  const manejarCambio = (indice, campo, valor) => {
    setUsuarios(prevUsuarios => {
      const nuevosUsuarios = [...prevUsuarios];
      nuevosUsuarios[indice] = { ...nuevosUsuarios[indice], [campo]: valor };
      return nuevosUsuarios;
    });
  };

  return (
    <main className='d-flex flex-column min-vh-100'>
      <div className="container mt-5 px-1">
        <h1 className="mt-5">Panel de administración de Usuarios</h1>

        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li className="nav-item w-50">
                <Link className="nav-link" to="/projectAdmin">Recetas</Link>
              </li>
              <li className="nav-item w-50">
                <Link className="nav-link active" to="/usuAdmin">Usuarios</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border border-top-0 p-3">
          <div className="col-12" style={{ overflowX: 'auto' }}>
            <table className="table table-hover align-middle mt-3" style={{ minWidth: '1200px' }}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Fecha de Registro</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, indice) => (
                  <tr key={indice}>
                    <td>
                      <div className="containerImagen">
                        <div className="rounded-circle d-flex align-items-end justify-content-end" style={{ backgroundImage: `url(${usuario.imagen})`, width: '50px', height: '50px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                          <i className="btn btn-success btn-sm rounded-circle bi bi-pencil" style={{ fontSize: '10px' }}></i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input type="text" className="form-control form-control-sm" value={usuario.nombre} onChange={(e) => manejarCambio(indice, 'nombre', e.target.value)} />
                    </td>
                    <td>
                      <input type="email" className="form-control form-control-sm" value={usuario.email} onChange={(e) => manejarCambio(indice, 'email', e.target.value)} />
                    </td>
                    <td>
                      <select className="form-control form-control-sm" value={usuario.rol} onChange={(e) => manejarCambio(indice, 'rol', e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Registrado">Registrado</option>
                        <option value="Chef">Chef</option>
                      </select>
                    </td>
                    <td>
                      <input type="date" className="form-control form-control-sm" value={usuario.fechaRegistro} onChange={(e) => manejarCambio(indice, 'fechaRegistro', e.target.value)} />
                    </td>
                    <td>
                      <select className="form-control form-control-sm" value={usuario.activo} onChange={(e) => manejarCambio(indice, 'activo', e.target.value)}>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-success">Actualizar</button>
                      <i className="btn btn-sm btn-outline-danger bi bi-trash3 ms-2"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UsuAdmin;
