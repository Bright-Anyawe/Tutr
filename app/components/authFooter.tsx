import Badge from "./badge";
import styles from "../styles/auth.module.css";


const AuthFooter = () => {
    return (
        <div><div className={styles.footer}>
        <Badge />
        <span className={styles.poweredBy}>Powered by Really AI</span>
      </div></div>
    )
}

export default AuthFooter;
