import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import supabase from '../utils/supabase';

const Register = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    primerNombre: '',
    correoElectronico: '',
    imagen: '',
    clave: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [redirigir, setRedirigir] = useState(false); // Estado para redirigir después del registro

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para gestionar el registro
  const gestionarRegistro = async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    const { correoElectronico, clave, primerNombre, imagen } = formData;

    // Registrar el nuevo usuario en Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: correoElectronico,
      password: clave,
    });

    if (authError) {
      setMensaje('Error al registrar el usuario: ' + authError.message);
    } else if (authData) {
      // Actualizar los datos del usuario en la tabla 'usuarios'
      const { data: updateData, error: updateError } = await supabase
        .from('usuarios') 
        .upsert({
          user_id: authData.user.id,          
          nombre: primerNombre || null,        
          avatar: imagen || null,              
          rol: 'user',                                                 
        });

      if (updateError) {
        setMensaje('Error al actualizar los datos del usuario: ' + updateError.message);
      } else {
        // Limpiar el formulario y mostrar mensaje de éxito
        setFormData({
          primerNombre: '',
          correoElectronico: '',
          imagen: '',
          clave: ''
        });
        setMensaje('Registro exitoso. Redirigiendo al inicio de sesión...');

        // Redirigir al inicio de sesión automáticamente
        setRedirigir(true);
      }
    } else {
      setMensaje('Error al registrar el usuario: No se recibió información del usuario.');
    }
  };

  // Si redirigir es true, navega al inicio de sesión
  if (redirigir) {
    return <Navigate to="/login" />;  // Aquí se redirige a la página de inicio de sesión
  }

  return (
    <main>
      <div className="fondo-oscuro">
        <div className="contenido-registrar">
          <h2 className="text-white mb-4 text-center">Registrarse</h2>
          
          {/* Mostrar mensaje si existe */}
          {mensaje && <div className="alert alert-info">{mensaje}</div>}

          <form onSubmit={gestionarRegistro}>
            <div className="mb-3">
              <label htmlFor="primer-nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control input-control"
                id="primer-nombre"
                name="primerNombre"
                value={formData.primerNombre}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="correo-electronico" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control input-control"
                id="correo-electronico"
                name="correoElectronico"
                value={formData.correoElectronico}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">Url Imagen</label>
              <input
                type="text"
                className="form-control input-control"
                id="imagen"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                required
              />
            </div>
      
            <div className="mb-3">
              <label htmlFor="clave" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control input-control"
                id="clave"
                name="clave"
                value={formData.clave}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary w-100">Registrarse</button>
          </form>
          <p className="mt-3 text-white text-center">
            ¿Ya tienes cuenta? <Link to="/login" className="text-white">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
