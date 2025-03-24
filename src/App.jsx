import { Routes, Route } from "react-router-dom";
import Home from "./vistas/Home.jsx";
import Register from "./vistas/Register.jsx";
import Login from "./vistas/Login.jsx";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
     
    </Routes>
  );
};

export default App;

