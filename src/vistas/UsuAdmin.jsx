import React, { useState } from 'react';

const UsuAdmin = () => {
  const [users, setUsers] = useState([
    {
      img: 'https://randomuser.me/api/portraits/men/1.jpg',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      role: 'Admin',
      registrationDate: '2023-01-15',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/2.jpg',
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@example.com',
      role: 'Chef',
      registrationDate: '2023-02-18',
    },
    // Puedes agregar más usuarios aquí
  ]);

  // Función para manejar el cambio en los campos de texto
  const handleChange = (index, field, value) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
  };

  return (
    <main>
      <div className="container mt-5 px-1">
        <h1 className="mt-5">Panel de administración de Usuarios</h1>

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

        {/* Tabla de usuarios */}
        <div className="border border-top-0 p-3">
          {/* Tabla */}
          <div className="col-12" style={{ overflowX: 'auto' }}>
            <table className="table table-hover align-middle mt-3" style={{ minWidth: '1200px' }}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className="containerImagen">
                        <div className="rounded-circle d-flex align-items-end justify-content-end" style={{ backgroundImage: `url(${user.img})`, width: '50px', height: '50px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                          <i className="btn btn-success btn-sm rounded-circle bi bi-pencil" style={{ fontSize: '10px' }}></i>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={user.firstName}
                        onChange={(e) => handleChange(index, 'firstName', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={user.lastName}
                        onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        value={user.email}
                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={user.role}
                        onChange={(e) => handleChange(index, 'role', e.target.value)}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Registrado">Registrado</option>
                        <option value="Chef">Chef</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={user.registrationDate}
                        onChange={(e) => handleChange(index, 'registrationDate', e.target.value)}
                      />
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
