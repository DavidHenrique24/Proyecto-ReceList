import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    primerNombre: '',
    primerApellido: '',
    correoElectronico: '',
    clave: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos, por ejemplo, hacer un POST a tu servidor
    console.log(formData);
  };

  return (
    <main>
      <div className="fondo-oscuro">
        <div className="contenido-registrar">
          <h2 className="text-white mb-4 text-center">Registrarse</h2>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="primer-apellido" className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control input-control"
                id="primer-apellido"
                name="primerApellido"
                value={formData.primerApellido}
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
