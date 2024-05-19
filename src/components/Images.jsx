import ImageList from "./ImageList";
import styles from "./Images.module.css";
import Loader from "./Loader";

function Images({ image, onSelectImage, isLoading }) {
    return (
        <ul className={styles.list}>
            {isLoading ? (
                <Loader />
            ) : (
                image.map(function (e) {
                    return (
                        <ImageList
                            key={e.id}
                            imagem={e}
                            onSelectImage={onSelectImage}
                        />
                    );
                })
            )}
        </ul>
    );
}

export default Images;
