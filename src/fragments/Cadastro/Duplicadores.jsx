

function Duplicadores(dadosBasicos, setDadosBasicos) {


    const duplicateContato = () => {
        try {
            setDadosBasicos({
                ...dadosBasicos,
                contatos: [...dadosBasicos.contatos, { nome: '', telefone: '', senha: '', contraSenha: '', dataNascimento: '', observacao: '' }],
            });
        } catch (error) {
            console.error('Erro ao duplicar contato:', error);
        }
    };

    const duplicateSetor = () => {
        try {
            setDadosBasicos({
                ...dadosBasicos,
                setores: [...dadosBasicos.setores, { setor: '', localizacao: '', observacao: '' }],
            });
        } catch (error) {
            console.error('Erro ao duplicar setor:', error);
        }
    };

    const duplicateViagem = () => {
        try {
            setDadosBasicos({
                ...dadosBasicos,
                viagens: [...dadosBasicos.viagens, { nomeContatoNotificacaoSaida: '', nomeContatoNotificacaoVolta: '', observacao: '', dataSaida: '', dataVolta: '', procedimentos: '' }],
            });
        } catch (error) {
            console.error('Erro ao duplicar viagem:', error);
        }
    };

    return { duplicateContato, duplicateSetor, duplicateViagem };


}

export default Duplicadores