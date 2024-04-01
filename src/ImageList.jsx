import styles from "./ImageList.module.css";

function ImageList({ imagem }) {
    return (
        <li>
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
