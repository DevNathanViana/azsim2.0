import InputMask from 'react-input-mask';
import ErrorCard from '../Geral/ErrorCard';
import PropTypes from 'prop-types';
// import '../css/cadastros.css';


function DadosBasicos({ dadosBasicos, errors, setDadosBasicos, register, handleChangeNatureza, natureza, }) {

    return (
        <div className="dadosBasicos">
            <div className="row">
                <div className="col mb-2">
                    <label htmlFor="unidade" className="form-label"><strong>* Unidade</strong></label>
                    <select value={dadosBasicos.unidade || ""} name='unidade'  {...register("unidade", { required: false })} id="unidade" className={`form-select ${errors.unidade ? 'is-invalid' : ''}`} aria-label=".form-select example" onChange={(e) => setDadosBasicos({ ...dadosBasicos, unidade: e.target.value })}>
                        <option defaultValue={"Montenegro"} value="Montenegro">Montenegro</option>
                        <option value="Porto Alegre">Porto Alegre</option>
                        <div className="invalid-feedback">{errors.unidade?.message}</div>

                    </select>
                </div>

                <div className="col">
                    <label htmlFor="codHabil" className="form-label"><strong>Hábil</strong></label>
                    <input name='codHabil' {...register("codHabil", { required: false })} type="text" className="form-control" id="codHabil" placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, codHabil: e.target.value })} value={dadosBasicos.codHabil || ""}
                    />
                </div>
                <div className="col h-25">
                    <label htmlFor="codCondor" className="form-label"><strong>Condor</strong></label>
                    <input name='codCondor' {...register("codCondor", { required: false })} type="text" className="form-control" id="codCondor" placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, codCondor: e.target.value })} value={dadosBasicos.codCondor || ""}
                    />
                </div>
                <div className="col h-25">
                    <label htmlFor="codificador" className="form-label"><strong>* Codificador</strong></label>
                    <input name='codificador' {...register("codificador", { required: true })} type="text" className="form-control" id="codificador" placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, codificador: e.target.value })} value={dadosBasicos.codificador || ""}
                    />
                    {errors['codificador'] && <ErrorCard id='codificadorMsgErro' message="O campo codificador deve ser preenchido." />}

                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <label htmlFor="natureza" className="form-label">
                        <strong>* Natureza</strong>
                    </label>
                    <select
                        value={natureza}
                        name="natureza"
                        {...register("natureza", { required: true })}
                        id="natureza"
                        className="form-select"
                        aria-label=".form-select example"
                        onChange={handleChangeNatureza}
                    >

                        <option value="FISICA">
                            FISICA
                        </option>
                        <option value="JURIDICA">JURIDICA</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="documento" className="form-label">    <strong>* {natureza === "FISICA" ? "CPF" : "CNPJ"}</strong></label>
                    <InputMask
                        mask={natureza === "FISICA" ? "999.999.999-99" : "99.999.999/9999-99"}
                        maskChar=""
                        name="documento"
                        {...register("documento", { required: true })}
                        type="text"
                        className={`form-control ${errors['documento'] ? 'is-invalid' : ''}`}
                        id="documento"
                        placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, documento: e.target.value })}
                        value={dadosBasicos.documento || ""}
                    />
                    {errors['documento'] && <ErrorCard message="O campo CPF/CNPJ deve ser preenchido." />}
                </div>
                <div className="col">
                    <label htmlFor="inscMunicipal" className="form-label"><strong>Inscrição Municipal</strong></label>
                    <input name='inscMunicipal' {...register("inscMunicipal", { required: false })} type="text" className="form-control" id="inscMunicipal" placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, inscMunicipal: e.target.value })} value={dadosBasicos.inscMunicipal || ""}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col mb-2">
                    <label htmlFor="nome" className="form-label"><strong>* Nome/Razão Social</strong></label>
                    <input
                        value={dadosBasicos.nome || ""}
                        name='nome'
                        {...register("nome", { required: true })}
                        type="text"
                        className={`form-control ${errors['nome'] ? 'is-invalid' : ''}`}
                        id="nome"
                        placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, nome: e.target.value })}
                    />
                    {errors['nome'] && <ErrorCard className="cardErro" message="O campo Nome/Razão Social deve ser preenchido." />}
                </div>
                <div className="col">
                    <label htmlFor="nomeFantasia" className="form-label"><strong>Nome Fantasia</strong></label>
                    <input name='nomeFantasia' {...register("nomeFantasia", { required: false })} type="text" className="form-control" id="nomeFantasia" placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, nomeFantasia: e.target.value })} value={dadosBasicos.nomeFantasia || ""}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col mb-2">
                    <label htmlFor="endereco" className="form-label"><strong>Endereço</strong></label>
                    <input name='endereco' {...register("endereco", { required: false })} type="text" className="form-control" id="endereco" placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, endereco: e.target.value })} value={dadosBasicos.endereco || ""}
                    />
                </div>
                <div className="col">
                    <label htmlFor="bairro" className="form-label"><strong>Bairro</strong></label>
                    <input name='bairro' {...register("bairro", { required: false })} type="text" className="form-control" id="bairro" placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, bairro: e.target.value })} value={dadosBasicos.bairro || ""}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="cidade" className="form-label"><strong>Cidade</strong></label>
                    <input name='cidade' {...register("cidade", { required: false })} type="text" className="form-control" id="cidade" placeholder=""
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, cidade: e.target.value })} value={dadosBasicos.cidade || ""}
                    />
                </div>
                <div className="col">
                    <label htmlFor="uf" className="form-label"><strong>Uf</strong></label>
                    <select value={dadosBasicos.uf || ""} name='uf' {...register("uf", { required: false })} id="uf" className="form-select" aria-label=".form-select example" onChange={(e) => setDadosBasicos({ ...dadosBasicos, uf: e.target.value })}>
                        <option defaultValue={"AC"} value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>

                    </select>
                </div>

                <div className="col">
                    <label htmlFor="cep" className="form-label"><strong>CEP</strong></label>
                    <InputMask
                        mask="99999-999"
                        maskChar=""
                        name="cep"
                        {...register("cep", { required: false })}
                        required
                        type="text"
                        className="form-control"
                        id="cep"
                        placeholder=""
                        value={dadosBasicos.cep || ""}
                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, cep: e.target.value })}
                    />
                </div>

            </div>
            <div className="row mt-2">
                <div className="col-lg ">
                    <label htmlFor="observacao" className="form-label"><strong>Observações</strong></label>
                    <input {...register("observacao", { required: false })} className="form-control" id="observacao" rows="3" onChange={(e) => setDadosBasicos({ ...dadosBasicos, observacao: e.target.value })} value={dadosBasicos.observacao || ""} />
                </div>
            </div>
        </div>
    )


}

DadosBasicos.propTypes = {
    dadosBasicos: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    setDadosBasicos: PropTypes.object.isRequired,
    register: PropTypes.object.isRequired,
    handleChangeNatureza: PropTypes.object.isRequired,
    natureza: PropTypes.object.isRequired,
}


export default DadosBasicos;