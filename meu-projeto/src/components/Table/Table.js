import styles from "./Table.module.css";
import Styles from "./Tools.module.css";
import * as React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare,faTrash,faPlus,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import ModalPage from "../Modal/ModalPage"
import ModalPageUpdate from "../ModalUpdate/ModalUpdate";

function Table() {

  const [AllUsers, setAllUsers] = useState([]);
  const [OpenModal, setOpenModal] = useState(false)
  const [CountUsers, setCountUsers] = useState([]);
  const [Search, setSearch] = useState('');

  const [openModalUs, setOpenModalUs] = useState({});

  const toggleModal = (userId) => {
    setOpenModalUs((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId] || false,
    }));
  };

  const   [usuarioIdU, setusuarioIdU] = useState('');
  const [nome_completoU, setNomeCompleto] = useState('');
  const [emailU, setEmail] = useState('');
  const [telefoneU, setTelefone] = useState('');
  const [CNPJU, setCNPJ] = useState('');
  const [enderecoU, setEndereco] = useState('');
  const [cidadeU, setCidade] = useState('');

  useEffect(() => {
    
    async function getAllUsers(){
      const response = await api.get('/usuarios')

      setAllUsers(response.data);
    }

    async function getCountUsers(){
      const response = await api.get('/userCount')

      setCountUsers(response.data);
    }



    getCountUsers();
    getAllUsers();
    
  }, [])

  async function handleDelete(usuarioId){

    await api.delete(`/usuarios/${usuarioId}`);
    window.location.reload();
  }


  return (
    <>
      <div className={Styles.tools}>
        <button className={Styles.registro} type="button" onClick={()  => setOpenModal(true)}>
            <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff", paddingRight:"0.2em",height:"14px", width:"14px"}} /> 
            <p className={Styles.buttonText}>Novo Registro</p>
        </button>
        <div className={Styles.TextInput}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#949fac",}} />
            <input type="text" className={Styles.SelfInput} onChange={(e)=> setSearch(e.target.value)} placeholder="Pesquisar..."/>
        </div>
        <p className={Styles.qtdRegistros}>{CountUsers} Registros</p>
        <ModalPage isOpen={OpenModal} setModalOpen={() => setOpenModal(!OpenModal)}/>
      </div>
      <div className={styles.PageBody}>
        <table >
            <thead>
              <tr>
                <th>Nome do Cliente</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>CNPJ</th>
                <th>Endereço</th>
                <th>Cidade</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {
                AllUsers.filter((usuarios) => {
                  return Search.toLowerCase() === '' 
                  ? usuarios 
                  : usuarios.nome_completo.toLowerCase().includes(Search.toLowerCase());
                })
                .map(usuarios => {
                  return(
                    <tr key={usuarios._id}>
                      <td>{usuarios.nome_completo}</td>
                      <td>{usuarios.email}</td>
                      <td>{usuarios.telefone}</td>
                      <td>{usuarios.CNPJ}</td>
                      <td>{usuarios.endereco}</td>
                      <td>{usuarios.cidade}</td>
                      <td>
                        <button 
                          className={styles.registro} 
                          type="button" 
                          onClick={() => toggleModal(usuarios._id)  }>
                          <FontAwesomeIcon icon={faPenToSquare} style={{color: "#7f23f7",}} />
                        </button>
                        <ModalPageUpdate
                          isOpenU={openModalUs[usuarios._id] || false}
                          usuarioId={usuarios._id}
                          nome_completoR={usuarios.nome_completo}
                          EmailR={usuarios.email}
                          TelefoneR={usuarios.telefone}
                          CNPJR={usuarios.CNPJ}
                          EnderecoR={usuarios.endereco}
                          CidadeR={usuarios.cidade}
                          setModalOpenU={() => toggleModal(usuarios._id)}
                        />
                        <button className={styles.registro} type="submit" onClick={e => handleDelete(usuarios._id)} >
                          <FontAwesomeIcon icon={faTrash} style={{color: "#7f23f7",}} />
                        </button>
                      </td>
                    </tr>
                  )
                })
                
              }
            </tbody>
        </table>
      </div>
    </>
    
  );
  }
  
export default Table;