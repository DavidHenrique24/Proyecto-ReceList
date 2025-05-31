import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../componentes/userProvider";
import supabase from "../utils/supabase";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [ultimasRecetas, setUltimasRecetas] = useState([]);
  const [ultimosUsuarios, setUltimosUsuarios] = useState([]);

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


  useEffect(() => {
  const fetchUltimosUsuarios = async () => {
    const { data } = await supabase
      .from("usuarios")      
      .select("id, nombre, avatar, created_at")
      .order("created_at", { ascending: false }) 
      .limit(3);
      setUltimosUsuarios(data);
    
  };

  fetchUltimosUsuarios();
}, []);



  useEffect(() => {
    const fetchUltimasRecetas = async () => {
      const { data } = await supabase
        .from("recetas")
        .select("*")
        .order("created_at", { ascending: false }) //Ascendente para mostrar los últimos
        .limit(3); //Para poner limite de Recetas mostradas
        setUltimasRecetas(data);
    };

      fetchUltimasRecetas();
    
  });

  // Vista cuando hay usuario logueado
  if (user) {
    return (
      <main>
    
    
 <section
  className="text-white d-flex align-items-center justify-content-center text-center p-5"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://img.freepik.com/foto-gratis/joven-chef-cocina-pizzeria-cortando-tomates-frescos-pizza-vertical-vertical_166373-6621.jpg?semt=ais_hybrid&w=740")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "600px",
  }}
>
  <div className="container">
    <p className="fs-4">¡Bienvenido/a, {user.nombre}!</p>
    <h1 className="display-1 fw-bold mb-4">LAS MEJORES RECETAS<br />EN RECELIST</h1>
    <Link to="/listRece" className="btn btn-outline-light fs-4 px-5 py-2">
      Explorar recetas
    </Link>
  </div>
</section>



        <section className="p-5 my-5">
          <h2 className="mb-5 text-center">Últimas recetas</h2>
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
                        {/* sirve para formatear la fecha en un formato mas bonito */}
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

<section
  className="text-white d-flex align-items-center"
  style={{
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://static.excelenciasgourmet.com/cdn/ff/1C1_gHiijkVnJ3MbWg6fMTDDTJ_jDtdn6w4mW6L9K38/1721683340/public/2021-08/cocina-restaurante.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    minHeight: "600px",
  }}
>
  <div className="container">
    <div
      className="p-5 rounded-4 shadow-lg bg-dark bg-opacity-75 text-center mx-auto"
      style={{ maxWidth: "800px" }}
    >
      <h2 className="display-5 fw-bold mb-4">¿Qué es ReceList?</h2>
      <p className="fs-5">
       ReceList es una página web creada por David Henrique, pensada para los amantes de la cocina. Aquí podrás descubrir recetas de todo tipo, compartir las tuyas, editar o eliminar las que hayas publicado, y comentar en las de otros usuarios. Además, si tienes permisos de administrador, contarás con un panel de control para gestionar tanto las recetas como los usuarios.
        <br />
       </p>
    </div>
  </div>
</section>




  <section className="mt-5">
  <h2 className="mb-5 text-center">Últimos usuarios registrados</h2>
  <div className="d-flex justify-content-center gap-4 flex-wrap">
    {ultimosUsuarios.map((usuario) => (
      <div 
        key={usuario.id} 
        className="card text-center"
        style={{ width: "250px", minHeight: "300px" }}
      >
        <img
          src={usuario.avatar || "/default-avatar.png"} 
          alt={usuario.nombre}
          className="card-img-top rounded-circle mx-auto mt-4"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{usuario.nombre}</h5>
          <small className="text-muted">
            {new Date(usuario.created_at).toLocaleDateString()}
          </small>
        </div>
      </div>
    ))}
  </div>
</section>
<br />
<br />



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
