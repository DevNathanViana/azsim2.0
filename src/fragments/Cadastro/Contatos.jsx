import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
// import '../css/cadastros.css';


function Contatos({ dadosBasicos, setDadosBasicos, register, index, contato, deleteItem }) {

    return (
        <div key={index} className='contatosDivMain'>
            <div className="row">
                <div className="col-5 mb-2">
                    <label htmlFor={`nome${index}`} className="form-label"><strong>Nome</strong></label>
                    <input
                        name={`nome${index}`}
                        {...register(`nome${index}`, { required: false })}
                        type="text"
                        className="form-control"
                        id={`nome${index}`}
                        placeholder=""
                        value={contato.nome}
                        onChange={(e) => setDadosBasicos({
                            ...dadosBasicos,
                            contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, nome: e.target.value } : c)),
                        })}
                    />
                </div>

                <div className="col mb-2">
                    <label htmlFor={`senha${index}`} className="form-label"><strong>Senha</strong></label>
                    <input
                        {...register(`senha${index}`, { required: false })}
                        type="text"
                        className="form-control"
                        id={`senha${index}`}
                        placeholder=""
                        value={contato.senha}
                        onChange={(e) => setDadosBasicos({
                            ...dadosBasicos,
                            contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, senha: e.target.value } : c)),
                        })}
                    />
                </div>

                <div className="col mb-2">
                    <label htmlFor={`contraSenha${index}`} className="form-label"><strong>Contra-Senha</strong></label>
                    <input
                        {...register(`contraSenha${index}`, { required: false })}
                        type="text"
                        className="form-control"
                        id={`contraSenha${index}`}
                        placeholder=""
                        value={contato.contraSenha}
                        onChange={(e) => setDadosBasicos({
                            ...dadosBasicos,
                            contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, contraSenha: e.target.value } : c)),
                        })}
                    />
                </div>
                <div className="col-1">
                    {dadosBasicos.contatos.length > 1 && (
                        <button
                            type="button"
                            className="btn btn-danger btn-excluir"
                            onClick={() => deleteItem('contatos', index)}
                        >
                            X
                        </button>
                    )}
                </div>
                <div className='row'>
                    <div className="col mb-2">
                        <label htmlFor={`telefone${index}`} className="form-label"><strong>Telefone</strong></label>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskChar=""
                            name={`telefone${index}`}
                            required
                            {...register(`telefone${index}`, { required: false })}
                            type="text"
                            className="form-control"
                            htmlFor={`telefone${index}`}
                            placeholder=""
                            value={contato.telefone}
                            onChange={(e) => setDadosBasicos({
                                ...dadosBasicos,
                                contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, telefone: e.target.value } : c)),
                            })}
                        />
                    </div>
                    <div className="col mb-2">
                        <label htmlFor={`dataNascimento${index}`} className="form-label"><strong>Data de Nascimento</strong></label>
                        <input
                            {...register(`dataNascimento${index}`, { required: false })}
                            type="date"
                            className="form-control"
                            id={`dataNascimento${index}`}
                            value={contato.dataNascimento}
                            onChange={(e) => setDadosBasicos({
                                ...dadosBasicos,
                                contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, dataNascimento: e.target.value } : c)),
                            })}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col mb-2">
                        <label htmlFor={`observacoesctt${index}`} className="form-label"><strong>Observações</strong></label>
                        <textarea
                            {...register(`contatos[${index}].observacoes`, { required: false })}
                            className="form-control"
                            id={`observacoesctt${index}`}
                            rows="2"
                            value={contato.observacoes}
                            onChange={(e) => setDadosBasicos({
                                ...dadosBasicos,
                                contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, observacao: e.target.value } : c)),
                            })}
                        ></textarea>
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    )


}

Contatos.propTypes = {
    dadosBasicos: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    setDadosBasicos: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    contato: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
}


export default Contatos;