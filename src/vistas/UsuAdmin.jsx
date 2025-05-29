import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../utils/supabase'

const UsuAdmin = () => {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data  } = await supabase
        .from('usuarios')
        .select('*')
        .order('created_at')
        setUsuarios(data)
    }

    fetchUsuarios()
  }, [])

  const manejarCambio = (indice, campo, valor) => {
    setUsuarios(prev => {
      const copia = [...prev]
      copia[indice] = { ...copia[indice], [campo]: valor }
      return copia
    })
  }

  const actualizarUsuario = async (usuario) => {
    const { id, ...campos } = usuario

    const { error } = await supabase
      .from('usuarios')
      .update(campos)
      .eq('id', id)

    if (error) {
      alert('Error al actualizar')
    } else {
      alert('Usuario actualizado')
    }
  }

  const borrarUsuario = async (id) => {
      if (!window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) return;
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error al borrar: ' + error.message)
    } else {
      setUsuarios(prev => prev.filter(u => u.id !== id))
      alert('Usuario borrado')
    }
  }

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
          
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, indice) => (
                  <tr key={usuario.id}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={usuario.avatar || "https://via.placeholder.com/70"}
                        alt=""
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%' }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={usuario.avatar || ''}
                        placeholder="URL de la imagen"
                        onChange={(e) => manejarCambio(indice, 'avatar', e.target.value)}
                        style={{ maxWidth: '300px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={usuario.nombre}
                        onChange={(e) => manejarCambio(indice, 'nombre', e.target.value)}
                      />
                    </td>
                 
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={usuario.rol}
                        onChange={(e) => manejarCambio(indice, 'rol', e.target.value)}
                      >
                        <option value="Admin">admin</option>
                        <option value="user">user</option>
                        <option value="chef">chef</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-success" onClick={() => actualizarUsuario(usuario)}>Actualizar</button>
                      <i
                        className="btn btn-sm btn-outline-danger bi bi-trash3 ms-2"
                        onClick={() => borrarUsuario(usuario.id)}
                        role="button"
                        
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UsuAdmin
