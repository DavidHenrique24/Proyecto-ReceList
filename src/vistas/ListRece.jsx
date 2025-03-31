import { useState } from "react";
import { Link } from "react-router-dom";

const ListRece = () => {
  const [recetas, setRecetas] = useState([
    {
      id: 1,
      name: "Estofado",
      description: "Estofado sabroso con ingredientes variados.",
      date: "13/12/2021",
      author: "Carlos",
      img: "https://media.istockphoto.com/id/599498966/es/foto/carne-de-res-guisada-con-patatas.jpg?s=612x612&w=0&k=20&c=O6pzgcP6-_gAng9rqStZgR2M0zZn-BAQiooMae9FIo4=",
      likes: 156,
    },
    {
      id: 2,
      name: "Pollo Abrasa",
      description: "Delicioso pollo, bastante rico.",
      date: "14/12/2021",
      author: "Pedro",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCha23q54YIVZKJ3huCfgAN2n1XF_UTNbqw&s",
      likes: 98,
    },
    {
      id: 3,
      name: "Tacos",
      description: "Tacos mexicanos con carne asada y guacamole.",
      date: "15/12/2021",
      author: "Ana",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/800px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
      likes: 230,
    },
  ]);

  const handleLike = (id) => {
    setRecetas((prevRecetas) =>
      prevRecetas.map((recipe) =>
        recipe.id === id ? { ...recipe, likes: recipe.likes + 1 } : recipe
      )
    );
  };

  return (
    <main className="container mt-5 px-1">
      <h1 className="text-center">Recetas</h1>

      {/* Pestañas */}
      <div className="row mt-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item w-50">
              <a className="nav-link active" href="#">Todas Las Recetas</a>
            </li>
            <li className="nav-item w-50">
              <a className="nav-link" href="#">Mis Recetas</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Contenedor de búsqueda y botón */}
      <div className="border border-top-0 p-3">
        <div className="row">
          <div className="col-12 col-sm-4 mb-3">
            <button className="btn btn-primary w-100">Subir receta</button>
          </div>
          <div className="d-flex col-12 col-sm-8 mb-3">
            <div className="input-group flex-nowrap">
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control" placeholder="Buscar receta" />
              <span className="input-group-text"><i className="bi bi-x"></i></span>
            </div>
          </div>
        </div>

        {/* Tarjetas de recetas */}
        <div className="row mt-3">
          {recetas.map((recipe) => (
            <div key={recipe.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <Link to={`/receDetalle/${recipe.id}`} className="text-decoration-none text-dark">
                <div className="card h-100">
                  <img src={recipe.img} className="card-img-top" alt={recipe.name} />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text">{recipe.description}</p>
                    <p><strong>Fecha:</strong> {recipe.date}</p>
                    <p><strong>Autor:</strong> {recipe.author}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <button className="btn btn-sm icono" onClick={() => handleLike(recipe.id)}>
                      {recipe.likes} <i className="bi bi-heart"></i>
                    </button>
                    <div>
                      <button className="btn btn-sm icono"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-sm ms-2 icono"><i className="bi bi-trash"></i></button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ListRece;
