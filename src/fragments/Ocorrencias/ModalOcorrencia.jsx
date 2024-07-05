import axios from 'axios';
import '../../css/ocorrencias.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import HeaderModal from '../ModalOcorrenciaFragments/header';
import Inputs from '../ModalOcorrenciaFragments/inputs';
import DadosCadastro from '../ModalOcorrenciaFragments/dadosCadastro';


function ModalOcorrencia({ dataOcorrencia, setColocaOcorrenciasNaTela }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [modalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('nao');

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };


    useEffect(() => {
        if (dataOcorrencia) {
            setValue('tipoocorrencia', dataOcorrencia.tipoocorrencia || '');
            setValue('subtipoocorrencia', dataOcorrencia.subtipoocorrencia || '');
            setValue('operador', dataOcorrencia.operador || '');
            setValue('deslocamento', dataOcorrencia.deslocamento || 'nao');
            setValue('idagente', dataOcorrencia.idagente || '');
            setValue('agente', dataOcorrencia.agente || '');
            setValue('horaSaida', dataOcorrencia.horaSaida || '');
            setValue('horaChegada', dataOcorrencia.horaChegada || '');
            setValue('tempDeslocamento', dataOcorrencia.tempDeslocamento || '');
            setValue('horaSaidaLocal', dataOcorrencia.horaSaidaLocal || '');
            setValue('horaChegadaEmpresa', dataOcorrencia.horaChegadaEmpresa || '');
            setValue('tempRetorno', dataOcorrencia.tempRetorno || '');
            setValue('horaAbateLacre', dataOcorrencia.horaAbateLacre || '');
            setValue('horaLacre', dataOcorrencia.horaLacre || '');
            setValue('tempAtendimento', dataOcorrencia.tempAtendimento || '');
            setValue('kmSaida', dataOcorrencia.kmsaida || '');
            setValue('kmRetorno', dataOcorrencia.kmretorno || '');
            setValue('kmTotal', dataOcorrencia.kmtotal || '');
            setValue('resumo', dataOcorrencia.resumo || '');
            setValue('procedimentos', dataOcorrencia.procedimentos || '');
            setValue('ocorrenciapolicialresumo', dataOcorrencia.ocorrenciapolicialresumo || '');

            setSelectedValue(dataOcorrencia.deslocamento ? 'sim' : 'nao');

        }
    }, [dataOcorrencia, setValue]);

    const onSubmit = async (formData) => {
        try {
            formData.id = dataOcorrencia.id;
            formData.evento = dataOcorrencia.evento;
            formData.cliente = dataOcorrencia.cliente;

            if (formData.tipoocorrencia === '5' || formData.tipoocorrencia === '7') {
                delete formData.subtipoocorrencia;
            }

            formData.deslocamento = formData.deslocamento === 'sim';

            if (formData.tipoocorrencia && formData.resumo) {
                const response = await axios.post(`http://localhost:8080/api/ocorrencia`, formData);

                setColocaOcorrenciasNaTela((ocorrenciasAntigas) => {
                    const novasOcorrencias = ocorrenciasAntigas.filter((ocorrencia) => ocorrencia.id !== formData.id);
                    return novasOcorrencias;
                });
                console.log('Resposta do servidor:', response.data);
                console.log('Dados enviados:', formData);
            } else {
                const responseSemTirarCard = await axios.post(`http://localhost:8080/api/ocorrencia`, formData);

                setColocaOcorrenciasNaTela((ocorrenciasAntigas) => {
                    const novasOcorrencias = ocorrenciasAntigas
                        .map((ocorrencia) =>
                            ocorrencia.id === dataOcorrencia.id ? responseSemTirarCard.data : ocorrencia
                        );
                    return novasOcorrencias;
                });

                console.log('Resposta do servidor:', responseSemTirarCard.data);
                console.log('Dados enviados:', formData);
            }
            reset();
        } catch (error) {
            console.error('Erro ao enviar a ocorrência:', error);
        }
    };


    const handleCategoryChange2 = (e) => {
        setSelectedCategory(e.target.value);
    };


    const subCategoryOptions = {
        '1': [
            { value: 'setor Em Curto', label: 'SETOR EM CURTO' },
            { value: 'Sinal Teste Revisao', label: 'SINAL TESTE REVISAO' },
            { value: 'Sinal Teste Cliente', label: 'SINAL TESTE CLIENTE' },
            { value: 'conserto Sistema', label: 'CONSERTO SISTEMA' },
            { value: 'troca Codificador', label: 'TROCA CODIFICADOR' },
            { value: 'linha Telefonica Cortada', label: 'LINHA TELEFONICA CORTADA' },
            { value: 'sinal Teste Instalacao', label: 'SINAL TESTE INSTALACAO' },
            { value: 'bateria Fraca', label: 'BATERIA FRACA' },
            { value: 'teste Ctf Base Cliente', label: 'TESTE CTF BASE-CLIENTE' },
            { value: 'sensorIr', label: 'SENSOR IR/CONT.PRESO' },
            { value: 'sistema Com Problema-Colocacao RetiradaKit', label: 'SIST.C/PROBLEMA COLOCAÇÃO/RETIRADA KIT' },
            { value: 'canal Rf Aberto', label: 'CANAL RF ABERTO' },
            { value: 'mau Contato', label: 'MAU-CONTATO' },
            { value: 'az Senha', label: 'AZ SENHA AGENTE/TÉCNICO' },
        ],
        '2': [
            { value: 'sem Energia', label: 'SEM ENERGIA/REDE' },
            { value: 'ag No Local', label: 'AG NO LOCAL' },
            { value: 'presenca Animais', label: 'PRESENÇA DE ANIMAIS E/OU INSETOS' },
            { value: 'alarme Acidental', label: 'SINAL DE ALARME ACIDENTAL' },
            { value: 'procedimento Partida', label: 'PROCEDIMENTO PARTIDA' },
            { value: '3 SOS', label: 'SUBTIPOOCORRENCIA 3 SOS' },
            { value: 'suspeito Local', label: 'SINAL POR SUSPEITO NO LOCAL' },
            { value: 'arrombamento', label: 'SINAL ALARME ARROMBAMENTO' },
            { value: 'janela/porta Mal Fechada', label: 'JANELA/PORTA MAL FECHADA' },
            { value: 'alarme indesejado', label: 'SINAL DE ALARME INDESEJADO' },
        ],
        '3': [
            { value: 'situacao bloqueio', label: 'SITUAÇÃO DE BLOQUEIO' },
            { value: 'ativacao remota', label: 'ATIVAÇÃO REMOTA MTA' },
            { value: 'abertura/fechamento', label: 'ACOMPANHAMENTO ABERTURA/FECHAMENTO' },
            { value: 'verificacao externa', label: 'VERIFICAÇÃO EXTERNA' },
            { value: 'presenca no local (solicitada)', label: 'PRESENÇA NO LOCAL(SOLICITADO PELO CLIENTE)' },
            { value: 'deslacre de chave', label: 'DESLACRE DE CHAVE' },
            { value: 'malote', label: 'MALOTE' },
            { value: 'desativacao remota', label: 'DESATIVAÇÃO REMOTA MTA' },
            { value: 'ponto base', label: 'PONTO BASE' },
        ],

    };

    const filteredSubCategories = subCategoryOptions[selectedCategory] || [];

    return (
        <div className={`modal fade ${modalOpen ? 'show' : ''}`} id={`modal-${dataOcorrencia.id}`} tabIndex="-1" aria-labelledby={`modalLabel-${dataOcorrencia.id}`} aria-hidden={!modalOpen} style={{ display: modalOpen ? 'block' : 'none' }} data-bs-backdrop="false">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <HeaderModal dataOcorrencia={dataOcorrencia} />
                    <div className="modal-body p-0">
                        <Inputs dataOcorrencia={dataOcorrencia} selectedValue={selectedValue} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} handleCategoryChange2={handleCategoryChange2} handleSelectChange={handleSelectChange} errors={errors} filteredSubCategories={filteredSubCategories} />
                        <DadosCadastro dataOcorrencia={dataOcorrencia} />
                    </div>
                    <footer className="modal-footer justify-content-start">
                        <div className="row">
                            <div className="col-2 ms-1">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { handleSubmit((formData) => onSubmit(formData, dataOcorrencia.id))() }}> Fechar</button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div ></div >
    )

}

ModalOcorrencia.propTypes = {
    dataOcorrencia: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    selectedValue: PropTypes.string.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    setColocaOcorrenciasNaTela: PropTypes.func.isRequired
};

export default ModalOcorrencia