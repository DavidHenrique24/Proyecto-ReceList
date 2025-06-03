import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import { useUser } from "../componentes/userProvider";

// Componente para editar el perfil del usuario
const EditPerfil = ({ showModal, setShowModal }) => {
  // Hook personalizado para obtener y actualizar el usuario global
  const { user, setUser } = useUser();

  // Estado local para los datos del perfil
  const [perfil, setPerfil] = useState({
    nombre: '',
    avatar: '',
    email: '',
    rol: ''
  });

  // useEffect para cargar los datos del perfil cuando se muestra el modal
  useEffect(() => {
    const cargarDatosPerfil = async () => {
      // Obtener el usuario autenticado actual desde Supabase
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Actualizar el email en el estado del perfil
        setPerfil(prev => ({ ...prev, email: user.email }));

        // Consultar la tabla 'usuarios' para obtener nombre, avatar y rol
        const { data } = await supabase
          .from('usuarios')
          .select('nombre, avatar, rol')
          .eq('user_id', user.id)
          .single();

        if (data) {
          // Actualizar el estado del perfil con los datos obtenidos
          setPerfil(prev => ({
            ...prev,
            nombre: data.nombre || '',
            avatar: data.avatar || '',
            rol: data.rol || ''
          }));
        }
      }
    };

    // Solo cargar los datos si el modal está visible
    if (showModal) cargarDatosPerfil();
  }, [showModal]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil(prev => ({ ...prev, [id]: value }));
  };

  // Guardar los cambios realizados en el perfil
  const guardarCambios = async () => {
    // Obtener el usuario autenticado actual
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Verificar si ya existe un registro de usuario en la tabla 'usuarios'
    const { data: existe } = await supabase
      .from('usuarios')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    let resultado;
    if (existe) {
      // Si existe, actualizar el registro
      resultado = await supabase
        .from('usuarios')
        .update({
          nombre: perfil.nombre,
          avatar: perfil.avatar
        })
        .eq('user_id', user.id);
    } else {
      // Si no existe, insertar un nuevo registro
      resultado = await supabase
        .from('usuarios')
        .insert({
          user_id: user.id,
          nombre: perfil.nombre,
          avatar: perfil.avatar
        });
    }

    // Si no hay error, actualizar el usuario global y cerrar el modal
    if (!resultado.error) {
      alert('Perfil actualizado correctamente');

      // Obtener los datos actualizados del perfil
      const { data: nuevoPerfil } = await supabase
        .from('usuarios')
        .select('nombre, avatar, rol')
        .eq('user_id', user.id)
        .single();

      // Actualizar el usuario global con los nuevos datos
      setUser({
        ...user,
        nombre: nuevoPerfil.nombre,
        avatar: nuevoPerfil.avatar,
        rol: nuevoPerfil.rol
      });

      // Cerrar el modal
      setShowModal(false);
    }
  };

  // Renderizado del modal de edición de perfil
  return (
    <>
      {showModal && (
        <>
          {/* Fondo del modal */}
          <div className="modal-backdrop fade show"></div>
          {/* Contenido del modal */}
          <div className="modal fade show d-block slide-in-modal">
            <form>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  {/* Encabezado del modal */}
                  <div className="modal-header border-0">
                    <h5 className="modal-title">Edición de perfil</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  {/* Cuerpo del modal */}
                  <div className="modal-body p-4">
                    <div className="form border shadow-sm p-4 rounded-3">
                      <div className="row g-4">
                        {/* Columna para el avatar */}
                        <div className="col-12 col-lg-4 text-center">
                          <div
                            className="rounded-circle mx-auto mb-3"
                            style={{
                              backgroundImage: `url(${perfil.avatar || 'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg'})`,
                              width: '200px',
                              height: '200px',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          ></div>
                          <label htmlFor="avatar" className="form-label">URL imagen</label>
                          <input id="avatar" type="url" className="form-control" value={perfil.avatar} onChange={handleChange} />
                        </div>

                        {/* Columna para los datos del usuario */}
                        <div className="col-12 col-lg-8">
                          <div className="d-flex flex-column gap-3">
                            <div>
                              <label htmlFor="nombre" className="form-label">Nombre</label>
                              <input id="nombre" type="text" className="form-control" value={perfil.nombre} onChange={handleChange} />
                            </div>
                            <div>
                              <label htmlFor="email" className="form-label">Email</label>
                              <input id="email" type="email" className="form-control" value={perfil.email} disabled />
                            </div>
                            <div>
                              <label className="form-label">Rol</label>
                              <input type="text" className="form-control" value={perfil.rol} disabled />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pie del modal con los botones de acción */}
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={guardarCambios}>Guardar cambios</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditPerfil;
