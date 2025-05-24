import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import { useUser } from "../componentes/userProvider";

const EditPerfil = ({ showModal, setShowModal }) => {
  const { user, setUser } = useUser();

  const [perfil, setPerfil] = useState({
    nombre: '',
    avatar: '',
    email: '',
    pass: '',
    rol: '' // Añadido el campo rol
  });

  useEffect(() => {
    const cargarDatosPerfil = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setPerfil(prev => ({ ...prev, email: user.email }));

        const { data } = await supabase
          .from('usuarios')
          .select('nombre, avatar, rol') // Seleccionamos también el rol
          .eq('user_id', user.id)
          .single();

        if (data) {
          setPerfil(prev => ({
            ...prev,
            nombre: data.nombre || '',
            avatar: data.avatar || '',
            rol: data.rol || ''
          }));
        }
      }
    };

    if (showModal) cargarDatosPerfil();
  }, [showModal]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil(prev => ({ ...prev, [id]: value }));
  };

  const guardarCambios = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: existe } = await supabase
      .from('usuarios')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    let resultado;
    if (existe) {
      resultado = await supabase
        .from('usuarios')
        .update({
          nombre: perfil.nombre,
          avatar: perfil.avatar
        })
        .eq('user_id', user.id);
    } else {
      resultado = await supabase
        .from('usuarios')
        .insert({
          user_id: user.id,
          nombre: perfil.nombre,
          avatar: perfil.avatar
        });
    }

    if (!resultado.error) {
      alert('Perfil actualizado correctamente');

      // Recuperamos los datos actualizados con el rol
      const { data: nuevoPerfil } = await supabase
        .from('usuarios')
        .select('nombre, avatar, rol')
        .eq('user_id', user.id)
        .single();

      // Actualizamos el usuario global
      setUser({
        ...user,
        nombre: nuevoPerfil.nombre,
        avatar: nuevoPerfil.avatar,
        rol: nuevoPerfil.rol
      });

      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block slide-in-modal" tabIndex="-1">
            <form>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <h5 className="modal-title">Edición de perfil</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body p-4">
                    <div className="form border shadow-sm p-4 rounded-3">
                      <div className="row g-4">
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
                              <label htmlFor="pass" className="form-label">Contraseña</label>
                              <input id="pass" type="password" className="form-control" value={perfil.pass} onChange={handleChange} placeholder="Nueva contraseña" />
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
