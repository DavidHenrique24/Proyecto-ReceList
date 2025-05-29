import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabase'; 

const ProjectAdmin = () => {
  const [recetas, setRecetas] = useState([]);
  
  // Función para obtener las recetas desde Supabase
  const fetchRecetas = async () => {
    const { data, error } = await supabase
      .from('recetas')
      .select('*');
    
    if (error) {
      console.error('Error al obtener recetas:', error);
    } else {
      setRecetas(data);
    }
  };

  // Cargar las recetas cuando el componente se monta
  useEffect(() => {
    fetchRecetas();
  }, []);

  // Función para manejar cambios en los campos de las recetas
  const manejasCambio = (id, campo, valor) => {
    const nuevasRecetas = recetas.map(receta =>
      receta.id === id ? { ...receta, [campo]: valor } : receta
    );
    setRecetas(nuevasRecetas);
  };

  // Función para actualizar la receta en Supabase
  const actualizarReceta = async (receta) => {
    const { error } = await supabase
      .from('recetas')
      .update({
        titulo: receta.titulo,
        descripcion: receta.descripcion,
        portada: receta.portada,   // actualizar también la URL de la imagen
      })
      .eq('id', receta.id);

    if (error) {
      console.error('Error al actualizar la receta:', error);
    } else {
      alert(`Receta actualizada correctamente`);
    }
  };

  // Función para eliminar una receta
  const eliminarReceta = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) return;

    const { error } = await supabase
      .from('recetas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar la receta:', error);
    } else {
      // Actualizar el estado local para eliminar la receta de la lista
      setRecetas(recetas.filter(receta => receta.id !== id));
      alert('Receta eliminada correctamente');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <div className="container mt-5 px-1">
          <h1 className="mt-5">Panel de administración de Recetas</h1>

          <div className="row mt-5">
            <div className="col-12">
              <ul className="nav nav-tabs">
                <li className="nav-item w-50">
                  <Link className="nav-link active" to="/projectAdmin">Recetas</Link>
                </li>
                <li className="nav-item w-50">
                  <Link className="nav-link" to="/usuAdmin">Usuarios</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12" style={{ overflowX: 'auto' }}>
            <table className="table table-hover align-middle mt-3" style={{ minWidth: '1200px' }}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Fecha de Creacion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recetas.map((receta) => (
                  <tr key={receta.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          className="containerImagen"
                          style={{
                            backgroundImage: `url(${receta.portada || '/imagenesProject/fotoDefault.jpg'})`,
                            width: '120px',
                            height: '90px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '6px',
                            border: '1px solid #ddd',
                          }}
                        ></div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={receta.portada || ''}
                          placeholder="URL de la imagen"
                          onChange={(e) => manejasCambio(receta.id, 'portada', e.target.value)}
                          style={{ maxWidth: '300px' }}
                        />
                      </div>
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={receta.titulo}
                        onChange={(e) => manejasCambio(receta.id, 'titulo', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={receta.descripcion}
                        onChange={(e) => manejasCambio(receta.id, 'descripcion', e.target.value)}
                      />
                    </td>
                    <td>
                      <span>{new Date(receta.created_at).toLocaleDateString()}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => actualizarReceta(receta)}
                      >
                        Actualizar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={() => eliminarReceta(receta.id)}
                        title="Eliminar receta"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
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
