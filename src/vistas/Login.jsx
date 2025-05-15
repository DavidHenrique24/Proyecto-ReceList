import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import { useUser } from '../componentes/userProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const gestionarLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: contrasena,
    });

    if (error) {
      setMensaje('Usuario o contraseña incorrectos');
      console.error('Error de autenticación:', error.message);
      return;
    }

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

      console.log('Usuario autenticado:', data.user);
      console.log('Rol del usuario:', userData?.rol);

      setUser({
        ...data.user,
        rol: userData?.rol,
        nombre: userData?.nombre,
        avatar: userData?.avatar,
        email: data.user.email 
      });

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

          {mensaje && <div className="alert alert-danger">{mensaje}</div>}

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
