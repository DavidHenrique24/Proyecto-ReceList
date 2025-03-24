import { Routes, Route } from "react-router-dom";
import Home from "./vistas/Home.jsx";
import Register from "./vistas/Register.jsx";
import Login from "./vistas/Login.jsx";
import ListRece from "./vistas/ListRece.jsx";
import ReceDetalle from "./vistas/ReceDetalle.jsx";
import NotFound from "./vistas/NotFound.jsx";
import ProjectAdmin from "./vistas/ProjectAdmin.jsx";
import UsuAdmin from "./vistas/UsuAdmin.jsx";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/listRece" element={<ListRece />} />
      <Route path="/receDetalle" element={<ReceDetalle />} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/projectAdmin" element={<ProjectAdmin />} />
      <Route path="/usuAdmin" element={<UsuAdmin />} />

     
    </Routes>
  );
};

export default App;

