import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../componentes/userProvider";
import supabase from "../utils/supabase";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [ultimasRecetas, setUltimasRecetas] = useState([]);
  
  const { user } = useUser(); // obtenemos el usuario del contexto

  // Efecto para animación on scroll
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(".animado");
      if (!element || visible) return;
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);


  // Efecto para cargar las 3 últimas recetas
  useEffect(() => {
    const fetchUltimasRecetas = async () => {
      const { data } = await supabase
        .from("recetas")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3); //Para poner limite de Recetas mostradas
        setUltimasRecetas(data);
    
      
    };

    if (user) {
      fetchUltimasRecetas();
    }
  }, [user]);

  // Vista cuando hay usuario logueado
  if (user) {
    return (
      <main className="p-5">
        <div className="text-center mb-5">
          <h2 className="mb-4">¡Bienvenido/a, {user.nombre}!</h2>
          <p className="fs-4">Explora las mejores recetas de ReceList</p>
        </div>

        <section>
          <h2 className="mb-4">Últimas recetas</h2>
          <div className="row">
            {ultimasRecetas.map((receta) => (
              <div key={receta.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <Link to={`/receDetalle/${receta.id}`}>
                    <img
                      src={receta.portada}
                      className="card-img-top"
                      alt={receta.titulo}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{receta.titulo}</h5>
                    <p className="text-muted">
                      <small>
                        {new Date(receta.created_at).toLocaleDateString()}
                      </small>
                    </p>
                    <p className="card-text">
                      {receta.descripcion.slice(0, 80)}...
                    </p>
                  </div>
  
                </div>
              </div>
            ))}
       
          </div>
        </section>
      </main>
    );
  }

  // Vista cuando no hay usuario
  return (
    <main>
      <div className="overlay">
        <div className="overlay-content">
          <p className="fs-5">
            Explora recetas increíbles y haz las tuyas propias
          </p>
          <h1
            className={`display-1 fw-bold animado ${
              visible ? "visible" : ""
            }`}
          >
            LAS MEJORES RECETAS
            <br />
            EN RECELIST
          </h1>
          <br />
          <Link
            to="/register"
            className="btn btn-outline-secondary text-white fs-3"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
