
const editPerfil = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal && (
        <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <form action="">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h5 className="modal-title">Edición de perfil</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="form border shadow-sm p-4 rounded-3">
                    <div className="row mb-4">
                      <div className="col-md-4 text-center">
                        <div className="rounded-circle mx-auto mb-3" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/68/e1/bd/68e1bdeb37a23ce848f5ec2bf280d68e.jpg)', width: '200px', height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <label htmlFor="imagen" className="form-label">URL imagen</label>
                        <input id="imagen" type="url" className="form-control" value="" />
                      </div>
                      <div className="col-md-8">
                        <div className="mb-3">
                          <label htmlFor="nombre" className="form-label">Nombre</label>
                          <input required id="nombre" type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="apellidos" className="form-label">Apellidos</label>
                          <input id="apellidos" type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input required id="email" type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="pass" className="form-label">Contraseña</label>
                          <input required id="pass" type="password" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button type="button" className="btn btn-primary">Guardar cambios</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default editPerfil;
