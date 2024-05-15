import styles from "./ErrorMessage.module.css";

function ErrorMessage({errorMessage}) {
    return (
        <p className={styles.error}>
            <span> ⛔ {errorMessage} </span>
        </p>
    );
}
export default ErrorMessage;
