import { Link } from 'react-router-dom';

const ListRece = () => {
  return (
    <main>
      <div className="fondo-oscuro">
        <div className="contenido-registrar">
          <h2 className="text-white mb-4 text-center">Iniciar sesión</h2>
          <form action="" method="POST">
            <div className="mb-3">
              <label htmlFor="correo-electronico" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control input-control"
                id="correo-electronico"
                name="correoElectronico"
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
                required
              />
            </div><br />
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

export default ListRece;
