import ImageList from "./ImageList";
import styles from "./Images.module.css";

function Images({ image, onSelectImage }) {
    return (
        <ul className={styles.list}>
            {image.map(function (e) {
                return (
                    <ImageList
                        key={e.id}
                        imagem={e}
                        onSelectImage={onSelectImage}
                    />
                );
            })}
        </ul>
    );
}

export default Images;
