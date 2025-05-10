import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [visible, setVisible] = useState(false);

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



  return (
    <main>
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
    </main>
  );
};

export default Home;
