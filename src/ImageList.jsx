import styles from "./ImageList.module.css";

function ImageList({ imagem, onSelectImage }) {
    return (
        <li onClick={() => onSelectImage(imagem.id)}>
            <img
                className={styles.img}
                src={imagem.largeImageURL}
                alt={imagem.tags}
                width={imagem.webformatWidth}
                height={imagem.webformatHeight}
            />
        </li>
    );
}

export default ImageList;
