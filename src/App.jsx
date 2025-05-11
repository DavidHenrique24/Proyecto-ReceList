import { Routes, Route } from "react-router-dom";
import Home from "./vistas/Home.jsx";
import Register from "./vistas/Register.jsx";
import Login from "./vistas/Login.jsx";
import ListRece from "./vistas/ListRece.jsx";
import ReceDetalle from "./vistas/ReceDetalle.jsx";
import EditRece from "./vistas/editRece.jsx";
import NotFound from "./vistas/NotFound.jsx";
import ProjectAdmin from "./vistas/ProjectAdmin.jsx";
import UsuAdmin from "./vistas/UsuAdmin.jsx";
import NuevoRece from "./vistas/nuevoRece.jsx";
import Header from "./componentes/Header.jsx";
import Footer from "./componentes/Footer.jsx";
import { UserProvider } from "./componentes/userProvider.jsx";

const App = () => {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listRece" element={<ListRece />} />
          <Route path="/receDetalle/:id" element={<ReceDetalle />} />
          <Route path="/editRece/:id" element={<EditRece />} />
          <Route path="/nuevoRece" element={<NuevoRece />} />
          <Route path="/projectAdmin" element={<ProjectAdmin />} />
          <Route path="/usuAdmin" element={<UsuAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </UserProvider>
    </>
  );
};

export default App;
