function CreateEtude(etude_id) {
    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createEtude">
                Yeni Bir Etüt Planla
            </button>
            <div className="modal fade" id="createEtude" tabIndex="-1" aria-labelledby="createEtudeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createEtudeModalLabel">
                                Yeni Bir Etüt Planla
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" method="post">
                                <div className="mb-3">
                                    <label className="form-label">Sınıf</label>
                                    <input type="text" className="form-control" placeholder="Örn:1"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tarih</label>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Başlangıç Saati</label>
                                    <input type="time" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Bitiş Saati</label>
                                    <input type="time" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Kapasite</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">
                                Tamam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEtude;
