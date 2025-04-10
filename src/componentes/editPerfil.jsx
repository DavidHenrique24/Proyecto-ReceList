import React from "react";
const EditPerfil = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal && (
        <>
          {/* Fondo oscuro */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal */}
          <div
            className={`modal fade show d-block slide-in-modal`}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <form>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <h5 className="modal-title">Edición de perfil</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body p-4">
                    <div className="form border shadow-sm p-4 rounded-3">
                      <div className="row g-4">
                        {/* Imagen */}
                        <div className="col-12 col-lg-4 text-center">
                          <div
                            className="rounded-circle mx-auto mb-3"
                            style={{
                              backgroundImage:
                                "url(https://i.pinimg.com/736x/68/e1/bd/68e1bdeb37a23ce848f5ec2bf280d68e.jpg)",
                              width: "200px",
                              height: "200px",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                          <label htmlFor="imagen" className="form-label">
                            URL imagen
                          </label>
                          <input
                            id="imagen"
                            type="url"
                            className="form-control"
                          />
                        </div>

                        {/* Inputs */}
                        <div className="col-12 col-lg-8">
                          <div className="d-flex flex-column gap-3">
                            <div>
                              <label htmlFor="nombre" className="form-label">
                                Nombre
                              </label>
                              <input
                                required
                                id="nombre"
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                              <input
                                required
                                id="email"
                                type="email"
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label htmlFor="pass" className="form-label">
                                Contraseña
                              </label>
                              <input
                                required
                                id="pass"
                                type="password"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer border-0">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="button" className="btn btn-primary">
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditPerfil;
