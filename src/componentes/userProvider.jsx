import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
      setUser(usuarioGuardado); // Si existe, establecerlo en el estado
    }
  }, []);

  // Guardar el usuario en localStorage cada vez que cambie el estado
  useEffect(() => {
    if (user) {
      localStorage.setItem('usuario', JSON.stringify(user)); // Guardar el usuario en localStorage
    } else {
      localStorage.removeItem('usuario'); // Eliminar usuario de localStorage si es null
    }
  }, [user]); // Este useEffect se ejecuta cada vez que cambia 'user'

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto
export const useUser = () => {
  return useContext(UserContext);
};