import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./index.css";
import App from "./App.jsx";
import Header from "./componentes/Header.jsx";
import Footer from "./componentes/Footer.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>{/* Aquí envolvemos toda la aplicación en BrowserRouter */}
      <Header />  {/* Renderizamos el Header y lo demas */}
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
