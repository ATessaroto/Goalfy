import React, { useState, useEffect } from "react"
import style from'./ModalUpdate.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAddressCard, faAt, faPhone, faIdCard, faLocationDot,faArrowUpRightFromSquare,faXmark} from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import api from "../../services/api"



function ModalPageUpdate({
    isOpenU,
    setModalOpenU,
    usuarioId,
    nome_completoR,
    EmailR,
    TelefoneR,
    CNPJR,
    EnderecoR,
    CidadeR
}){
    
    const [nome_completoU, setNomeCompleto] = useState(nome_completoR);
    const [emailU, setEmail] = useState(EmailR);
    const [telefoneU, setTelefone] = useState(TelefoneR);
    const [CNPJU, setCNPJ] = useState(CNPJR);
    const [enderecoU, setEndereco] = useState(EnderecoR);
    const [cidadeU, setCidade] = useState(CidadeR);
    
    const {register, handleSubmit, setValue, setFocus} = useForm();

    const [btnBackground, setBtnBackground] = useState({ backgroundColor: '#7f23f76b' });
    const [btnDisabled, setBtnDisabled] = useState(true);

    
    const [valNome, setValNome] = useState('');
    const [valEmail, setValEmail] = useState('');
    const [valTel, setValTel] = useState('');
    const [valCNPJ, setValCNPJ] = useState('');
    const [valCEP, setValCEP] = useState('');

    function validaNome() {
        setValNome(!/^[a-zA-Z\s]+$/.test(nome_completoU) ? '*Nome inválido - (apenas letras)' : '');
    }
    
    function validaEmail() {
        setValEmail(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailU) ? '*Email inválido' : '');
    }
    
    function validaTel() {
        setValTel(!/^\d{10,15}$/.test(telefoneU) ? '*Telefone inválido' : '');
    }
    
    function validaCNPJ() {
        setValCNPJ(!/^\d{14}$/.test(CNPJU) ? '*CNPJ inválido' : '');
    }

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');

        console.log(usuarioId, nome_completoR, nome_completoU)

        function validaCEP() {
            setValCEP(!/^\d{8}$/.test(cep) ? '*CEP inválido (Deve conter 8 digitos)' : '');
        }

        validaCEP();

        if (!e.target.value || e.target.value.length !== 8){
            setEndereco('')
            setCidade('')
            setValue('endereco', '');
            setValue('cidade', '');
            return; 
        } 

        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            setValue('endereco', data.logradouro);
            setValue('cidade', data.localidade);
            setEndereco(data.logradouro);
            setCidade(data.localidade);
        });
    }


    async function handleUpdate(e){
        e.preventDefault();

        await api.post(`/user/${usuarioId}`, {
            nome_completo: nome_completoU,
            email: emailU,
            telefone: telefoneU,
            CNPJ: CNPJU,
            endereco: enderecoU,
            cidade: cidadeU,
        })

        setNomeCompleto('')
        setEmail('')
        setTelefone('')
        setCNPJ('')
        setEndereco('')
        setCidade('')

        setModalOpenU();
        window.location.reload();
    }

    useEffect(() => {
        function enablesubmitbutton(){
            let btn = document.getElementById('btn_submit')
            if(
                /^[a-zA-Z\s]+$/.test(nome_completoU) && 
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailU) && 
                /^\d{10,15}$/.test(telefoneU) && 
                /^\d{14}$/.test(CNPJU) && 
                enderecoU && 
                cidadeU
            ){

                setBtnBackground({ backgroundColor: '#7f23f7' });
                setBtnDisabled(false);
            }
            else{
                setBtnBackground({ backgroundColor: '#7f23f76b' });
                setBtnDisabled(true);
            }
            
        }
                
        enablesubmitbutton();
    }, [nome_completoU,emailU,telefoneU,CNPJU,enderecoU,cidadeU])

    if(isOpenU){
        return(
            <form onSubmit={handleUpdate} className={style.backgroundModal}>

                <div className={style.modalLayout}>
                    <div className={style.titleModal}>
                        <div className={style.pageName}>
                                <FontAwesomeIcon 
                                    icon={faArrowUpRightFromSquare} 
                                    style={{color: "#7f23f7", height: "24px", Width: "24px"}} 
                                />
                                <p className={style.pagetitle}>
                                    Atualizar Cliente
                                </p>
                        </div>
                        <button 
                            className={style.closeButton} 
                            onClick={setModalOpenU}>
                                <FontAwesomeIcon icon={faXmark} style={{color: "#949fa6", height:"20px", width:"20px"}} />
                        </button>
                    </div>

                    <div className={style.modalBody}>
                        <label className={style.labelInput}>Nome do Cliente</label>
                        <div className={style.TextInput}>
                            <FontAwesomeIcon icon={faAddressCard} style={{color: "#949fa6", height:"16px", width:"16px"}} />
                            <input 
                                type="text" 
                                required
                                value={nome_completoU}
                                onChange={e => setNomeCompleto(e.target.value)}
                                onBlur={validaNome}
                                name="NomeCompleto"
                                className={style.SelfInput}
                                placeholder="Digite aqui..."
                            />
                        </div>
                        <p className={style.validationMessage}>{valNome}</p>
                    </div>

                    <div className={style.modalBody}>
                        <label className={style.labelInput}>Email</label>
                        <div className={style.TextInput}>
                            <FontAwesomeIcon icon={faAt} style={{color: "#949fa6", height:"16px", width:"16px"}} />
                            <input
                                type="text"
                                required
                                value={emailU}
                                onChange={e => setEmail(e.target.value)}
                                onBlur={validaEmail}
                                name="Email" 
                                className={style.SelfInput} 
                                placeholder="Digite aqui..."
                            />
                        </div>
                        <p className={style.validationMessage}>{valEmail}</p>
                    </div>

                    <div className={style.modalBody}>
                        <label className={style.labelInput}>Telefone</label>
                        <div className={style.TextInput}>
                            <FontAwesomeIcon icon={faPhone} style={{color: "#949fa6", height:"16px", width:"16px"}} />
                            <input
                                type="text"
                                required
                                value={telefoneU}
                                onBlur={validaTel}
                                onChange={e => setTelefone(e.target.value)}
                                name="Telefone" className={style.SelfInput} placeholder="Digite aqui..."
                            />
                        </div>
                        <p className={style.validationMessage}>{valTel}</p>
                    </div>

                    <div className={style.modalBody}>
                        <label className={style.labelInput}>CNPJ</label>
                        <div className={style.TextInput}>
                            <FontAwesomeIcon icon={faIdCard} style={{color: "#949fa6", height:"16px", width:"16px"}} />
                            <input 
                                type="text"
                                required
                                value={CNPJU}
                                onChange={e => setCNPJ(e.target.value)}
                                onBlur={validaCNPJ}
                                name="CNPJ" 
                                className={style.SelfInput}
                                placeholder="Digite aqui..."
                            />
                        </div>
                        <p className={style.validationMessage}>{valCNPJ}</p>
                    </div>

                    <div className={style.modalBody}>
                        <label className={style.labelInput}>CEP</label>
                        <div className={style.TextInput}>
                            <FontAwesomeIcon icon={faLocationDot} style={{color: "#949fa6", height:"16px", width:"16px"}} />
                            <input 
                                type="text"
                                required
                                name="CNPJ" 
                                className={style.SelfInput}
                                placeholder="Digite aqui..."
                                onBlur={checkCEP}
                            />
                        </div>
                        <p className={style.validationMessage}>{valCEP}</p>
                    </div>

                    <div className={style.modalBodyEndereco}>
                        <label className={style.labelInputEndereco}>Endereço</label>
                        <label className={style.labelInputCidade}>Cidade</label>
                        <div className={style.TextInputEndereco}>
                            <input 
                                type="text"
                                required
                                name="endereco" 
                                className={style.SelfInput} 
                                disabled           
                                {...register("endereco")}
                            />
                        </div>
                        <div className={style.TextInputCidade}> 
                            <input 
                                type="text"
                                required
                                name="cidade" 
                                className={style.SelfInput}    
                                disabled       
                                {...register("cidade" )}
                            />
                        </div>
                    </div>


                    <button id='btn_submit' className={style.registro} type="submit" style={btnBackground} disabled={btnDisabled} >
                        <p className={style.buttonText}>Atualizar</p>
                    </button>
                </div>
            </form>
        )
    }

    return null

}

export default ModalPageUpdate;
