import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const recetas = [
  {
    id: 1,
    img: "https://i.ytimg.com/vi/izgUJtUGwFI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgTig4MA8=&rs=AOn4CLDYo3aYmlxQ4ohUj0H4BxDqMx70Bw",
    name: "Receta 1",
    description: "Descripción de la receta 1",
    date: "2025-04-10",
    author: "Autor 1",
    category: "Postre",
    likes: 12,
  },
  {
    id: 2,
    img: "https://i.ytimg.com/vi/izgUJtUGwFI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgTig4MA8=&rs=AOn4CLDYo3aYmlxQ4ohUj0H4BxDqMx70Bw",
    name: "Receta 2",
    description: "Descripción de la receta 2",
    date: "2025-04-09",
    author: "Autor 2",
    category: "Entrante",
    likes: 8,
  },
  { 
  id: 3,
  img: "https://i.ytimg.com/vi/izgUJtUGwFI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgTig4MA8=&rs=AOn4CLDYo3aYmlxQ4ohUj0H4BxDqMx70Bw",
  name: "Receta 3",
  description: "Descripción de la receta 1",
  date: "2025-04-10",
  author: "Autor 1",
  category: "Postre",
  likes: 12,
}

];

const Home = () => {
  const [visible, setVisible] = useState(false);

  // Función para comprobar si el componente está visible en la pantalla
  const checkVisibility = () => {
    const element = document.querySelector(".animado");
    const rect = element.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Verifica si el elemento es visible al cargar la página

    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  // Función para manejar el like en una receta
  const handleLike = (id) => {
    console.log("Me gusta receta con ID:", id);
  };

  return (
    <main>
      {/* Sección principal con overlay */}
      <div className="overlay">
        <div className="overlay-content">
          <p className="fs-5">Explora recetas increíbles y haz las tuyas propias</p>
          <h1 className={`display-1 fw-bold animado ${visible ? "visible" : ""}`}>
            LAS MEJORES RECETAS <br /> EN RECELIST
          </h1>
          <br />
          <Link to="/register" className="btn btn-outline-secondary text-white fs-3">
            Registrarse
          </Link>
        </div>
      </div>
      <br />
      <div className="container mt-5">
        <h2 className="display-1 fw-bold">Últimas Recetas <img src="/imagenesProject/descarga.png" alt="" style={{ width: "100px" }} /> </h2>

        {/* Tarjetas de recetas */}
        <div className="row mt-3">
          {recetas.map((recipe) => (
            <div key={recipe.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
              
                <Link to={`/receDetalle/${recipe.id}`}>
                  <img
                    src={recipe.img}
                    className="card-img-top"
                    alt={recipe.name}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <p>
                    <strong>Fecha:</strong> {recipe.date}
                  </p>
                  <p>
                    <strong>Autor:</strong> {recipe.author}
                  </p>
                  <p>
                    <strong>Categoría:</strong> {recipe.category}
                  </p>
                </div>
                
                <div className="card-footer d-flex justify-content-between align-items-center">
          
                  <button
                    className="btn btn-sm icono"
                    onClick={() => handleLike(recipe.id)}
                  >
                    {recipe.likes} <i className="bi bi-heart"></i>
                  </button>

                </div>
              </div>
            </div>
          ))}
      
        </div>
      </div>
      <br />
      <br />
    </main>
  );
};

export default Home;
