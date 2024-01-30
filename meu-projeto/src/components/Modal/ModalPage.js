import React, { useState, useEffect } from "react"
import style from'./ModalPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAddressCard, faAt, faPhone, faIdCard, faLocationDot,faArrowUpRightFromSquare,faXmark} from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import api from "../../services/api"



function ModalPage({isOpen,setModalOpen}){

    const [nome_completo, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [CNPJ, setCNPJ] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');

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

        console.log()

        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            setValue('endereco', data.logradouro);
            setValue('cidade', data.localidade);
            setEndereco(data.logradouro);
            setCidade(data.localidade);
        });
    }

    const [valNome, setValNome] = useState('');
    const [valEmail, setValEmail] = useState('');
    const [valTel, setValTel] = useState('');
    const [valCNPJ, setValCNPJ] = useState('');
    const [valCEP, setValCEP] = useState('');


    const {register, handleSubmit, setValue, setFocus} = useForm();

    const [btnBackground, setBtnBackground] = useState({ backgroundColor: '#7f23f76b' });
    const [btnDisabled, setBtnDisabled] = useState(true);

    function validaNome() {
        setValNome(!/^[a-zA-Z\s]+$/.test(nome_completo) ? '*Nome inválido - (apenas letras)' : '');
    }
    
    function validaEmail() {
        setValEmail(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '*Email inválido' : '');
    }
    
    function validaTel() {
        setValTel(!/^\d{10,15}$/.test(telefone) ? '*Telefone inválido (Deve conter no mínimo 10 digitos)' : '');
    }
    
    function validaCNPJ() {
        setValCNPJ(!/^\d{14}$/.test(CNPJ) ? '*CNPJ inválido (Deve conter 14 digitos)' : '');
    }


    async function handlesubmit(e){
        e.preventDefault();

        console.log(endereco || cidade)

        const response = await api.post('/usuarios', {
            nome_completo,
            email,
            telefone,
            CNPJ,
            endereco,
            cidade
        })

        setNomeCompleto('')
        setEmail('')
        setTelefone('')
        setCNPJ('')
        setEndereco('')
        setCidade('')

        setModalOpen();
        window.location.reload();
    }

    useEffect(() => {
        function enablesubmitbutton(){
            let btn = document.getElementById('btn_submit')
            if(
                /^[a-zA-Z\s]+$/.test(nome_completo) && 
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 
                /^\d{10,15}$/.test(telefone) && 
                /^\d{14}$/.test(CNPJ) && 
                endereco && 
                cidade
            ){

                setBtnBackground({ backgroundColor: '#7f23f7' });
                setBtnDisabled(false);
                console.log('entrou')
            }
            else{
                setBtnBackground({ backgroundColor: '#7f23f76b' });
                setBtnDisabled(true);
            }
        }
                
        enablesubmitbutton();
    }, [nome_completo,email,telefone,CNPJ,endereco,cidade])

    if(isOpen){
        return(
            <form onSubmit={handlesubmit} className={style.backgroundModal}>

                <div className={style.modalLayout}>
                    <div className={style.titleModal}>
                        <div className={style.pageName}>
                                <FontAwesomeIcon 
                                    icon={faArrowUpRightFromSquare} 
                                    style={{color: "#7f23f7", height: "24px", Width: "24px"}} 
                                />
                                <p className={style.pagetitle}>
                                    Novo Cliente
                                </p>
                        </div>
                        <button 
                            className={style.closeButton} 
                            onClick={setModalOpen}>
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
                                value={nome_completo}
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
                                value={email}
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
                                value={telefone}
                                onChange={e => setTelefone(e.target.value)}
                                onBlur={validaTel}
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
                                value={CNPJ}
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
                        <p className={style.buttonText}>Cadastrar</p>
                    </button>
                </div>
            </form>
        )
    }

    return null

}

export default ModalPage;