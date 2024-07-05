import PropTypes from 'prop-types';
// import '../css/cadastros.css';


function Setores({ dadosBasicos, setDadosBasicos, register, index, setor, deleteItem }) {

    return (
        <div key={index} className="divMainSetores">
            <div className="row">
                <div className="col-5 mb-1">
                    <label htmlFor={`setor${index}`} className="form-label"><strong>Setor</strong></label>
                    <input value={setor.setor} {...register(`setor${index}`, { required: false })} type="string" className="form-control" id={`setor${index}`} placeholder="" onChange={(e) => setDadosBasicos({
                        ...dadosBasicos,
                        setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, setor: e.target.value } : c)),
                    })} />
                </div>

                <div className="col-6 mb-1">
                    <label htmlFor={`localInstalacao${index}`} className="form-label"><strong>Local da
                        Instalação</strong></label>
                    <input value={setor.localizacao} {...register(`localizacao${index}`, { required: false })} type="text" className="form-control" id={`localizacao${index}`}
                        placeholder="" onChange={(e) => setDadosBasicos({
                            ...dadosBasicos,
                            setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, localizacao: e.target.value } : c)),
                        })}
                    />
                </div>
                <div className=" col mb-1 ">
                    {dadosBasicos.setores.length > 1 && (
                        <button
                            type="button"
                            className="btn btn-danger btn-excluir"
                            onClick={() => deleteItem('setores', index)}
                        >
                            X
                        </button>
                    )}
                </div>

            </div>
            <div className="row">
                <div className=" col mb-1">
                    <label htmlFor={`observacoes${index}`}
                        className="form-label"><strong>Observações</strong></label>
                    <textarea value={setor.observacao} {...register(`observacoes${index}`, { required: false })} className="form-control" id={`observacoes${index}`} onChange={(e) => setDadosBasicos({
                        ...dadosBasicos,
                        setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, observacao: e.target.value } : c)),
                    })} rows="1"></textarea>

                </div>
            </div>
            <hr></hr>

        </div>
    )


}

Setores.propTypes = {
    dadosBasicos: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    setDadosBasicos: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    setor: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
}


export default Setores;