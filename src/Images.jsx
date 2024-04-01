import ImageList from "./ImageList";
import styles from './Images.module.css'

function Images({ image }) {
    return (
        <ul className={styles.list}>
            {image.map(function (e) {
                return <ImageList key={e.id} imagem={e} />;
            })}
        </ul>
    );
}

export default Images;
