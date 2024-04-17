import { useEffect, useState } from "react";
import styles from "./PopUpImage.module.css";
import Loader from "./Loader";
import { KEY } from './App'

function PopUpImage({
    selectedId,
    HandleCloseOverlay,
    setIsLoading,
    isLoading,
}) {
    const [image, setImage] = useState({});
    const { tags: title, largeImageURL, pageURL } = image;

    useEffect(() => {
        async function getImageDetails() {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `https://pixabay.com/api/?key=${KEY}&id=${selectedId}`
                );
                const data = await res.json();
                setImage(data.hits[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        if (selectedId) {
            getImageDetails();
        }
    }, [ selectedId, setIsLoading]);

    useEffect(() => {
        if (title) {
            document.title = `Image: ${title}`;
        } else {
            document.title = "Image Search";
        }

        return () => {
            document.title = "Image Search";
        };
    }, [title]);

    return (
        <>
            <span
                onClick={() => HandleCloseOverlay(false)}
                className={styles.overlay}
            ></span>
            <div className={styles.content}>
                <div className={styles.data}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <img
                            className={styles.img}
                            src={largeImageURL}
                            alt={title}
                        />
                    )}

                    <div className={styles.external}>
                        <a
                            className={styles.link}
                            href={pageURL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Original Source
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpImage;