// Gestión del localStorage
export const ls = {
    // Captura datos de localStorage
    getUsuario: () => {
      // Definimos usuario anónimo por si no hay datos en localStorage
      let usuario = {
        imagen: 'https://i.pinimg.com/736x/c3/97/b7/c397b77dffdc3778cf3de13a15704994.jpg',
        nombre: 'Pedro',
        email: 'Anonimo@example.com',
        rol: 'admin',
        fechaRegistro: '2023-01-15',
        activo: 'Sí'
      };
  
      // Capturamos datos de localStorage
      const usuarioJSON = localStorage.getItem('usuarioVanilla');
  
      // Si hay un usuario logueado, actualizamos usuario. Si no, devolvemos el anónimo
      if (usuarioJSON) {
        usuario = JSON.parse(usuarioJSON);
      }
  
      return usuario;
    },
  
    // Guarda el usuario en localStorage
    setUsuario: (usuario) => {
      const usuarioJSON = JSON.stringify(usuario);
      localStorage.setItem('usuarioVanilla', usuarioJSON);
    }
  };
  