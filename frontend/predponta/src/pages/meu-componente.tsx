interface MensagemProsps{
    mensagem: number;
}

const Mensagem: React.FC<MensagemProsps> = (props: MensagemProsps) => {
    return(
        <div>
            { props.mensagem }
        </div>
    )
}

const MeuComponente = () => {
    return (
        <div>
            <Mensagem mensagem={40}/>
        </div>
    )
}

export default MeuComponente;