import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import imagemDePerfil from '../img/iconUser.png';

function Navbar() {
  return (
    <div className={styles.navbar}>
        <p className={styles.title}>
            Goalfy
        </p>
        <div className={styles.pageName}>
            <FontAwesomeIcon 
                icon={faArrowUpRightFromSquare} 
                style={{color: "#7f23f7", height: "25px", Width: "25px"}} 
            />
            <p className={styles.pagetitle}>
                Registro de Clientes
            </p>
        </div>
        <div className={styles.right_side}>
            <div className={styles.navButtons}>
                <FontAwesomeIcon 
                    icon={faUser} 
                    style={{color: "#949fa6", height: "15px", Width: "15px"}} 
                />
                <p className={styles.membros}>
                    Membros(20)
                </p>
            </div>
            <div className={styles.userIcon}>
                <img className={styles.foto} src={imagemDePerfil} alt="Imagem de Perfil do Usuário"/>
            </div>
        </div>
    </div>
  );
}

export default Navbar;