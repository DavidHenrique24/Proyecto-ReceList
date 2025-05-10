import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase'; // Asegúrate de que la ruta sea correcta
import { useUser } from '../componentes/userProvider'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { setUser } = useUser(); // Accedemos a setUser desde el contexto
  const navigate = useNavigate();

  // Función para gestionar el inicio de sesión
  const gestionarLogin = async (e) => {
    e.preventDefault();

    // Usar Supabase para autenticar al usuario con los valores del formulario
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: contrasena, // Asegúrate de que se pase la variable correcta
    });

    // Comprobamos si hubo un error
    if (error) {
      setMensaje('Usuario o contraseña incorrectos');
      console.error('Error de autenticación:', error.message);
      return;
    }

    // Verificamos si data.user es válido antes de realizar la consulta al rol
    if (data?.user) {
      const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('rol, nombre, avatar')
      .eq('user_id', data.user.id)
      .single();
    

      if (userError) {
        console.error('Error al obtener el rol del usuario:', userError.message);
        setMensaje('Error al obtener el rol del usuario.');
        return;
      }

      // Mostrar en consola la información del usuario y su rol
      console.log('Usuario autenticado:', data.user);
      console.log('Rol del usuario:', userData?.rol);

      // Guardar el usuario y su rol en el contexto
      setUser({
        ...data.user,
        rol: userData?.rol,
        nombre: userData?.nombre,
        avatar: userData?.avatar
      });
      

      // Redirigir al panel de usuario
      navigate('/listRece'); 
    } else {
      setMensaje('Error de autenticación');
      console.error('No se pudo obtener el usuario');
    }
  };

  return (
    <main>
      <div className="fondo-oscuro">
        <div className="contenido-registrar">
          <h2 className="text-white mb-4 text-center">Iniciar sesión</h2>

          {/* Mostrar mensaje de error si existe */}
          {mensaje && <div className="alert alert-danger">{mensaje}</div>} {/* Cambié 'error' por 'mensaje' */}

          <form onSubmit={gestionarLogin}>
            <div className="mb-3">
              <label htmlFor="correo-electronico" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control input-control"
                id="correo-electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="clave" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control input-control"
                id="clave"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
          </form>

          <p className="mt-3 text-white text-center">
            ¿No tienes cuenta? <Link to="/register" className="text-white">Regístrate</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
