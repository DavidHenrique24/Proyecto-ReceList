// Gestión del localStorage
export const ls = {
    // Captura datos de localStorage
    getUsuario: () => {
      // Definimos usuario anónimo por si no hay datos en localStorage
      let usuario = {
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_-xaNRMVqjfSV_Q3-g0Z3oILDVVXaCxQxLA&s',
        nombre: 'Anónimo',
        email: 'Anonimo@example.com',
        rol: 'regsas',
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
  