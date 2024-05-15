import { useEffect, useState } from "react";
import styles from "./PopUpImage.module.css";
import Loader from "./Loader";
import { KEY } from "../pages/Search";

function PopUpImage({
    selectedId,
    HandleCloseOverlay,
    setIsLoading,
    isLoading,
    addFavorite,
}) {
    const [image, setImage] = useState({});
    const { tags: title, largeImageURL, pageURL, id } = image;

    function handleAdd() {
        const newImage = {
            id,
            title,
            largeImageURL,
        };
        addFavorite(newImage);
    }

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
    }, [selectedId, setIsLoading]);

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
                    <p className={styles.stars}>
                        <Star handleAdd={handleAdd} />
                    </p>
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

function Star({ handleAdd }) {
    return (
        <span className={styles.star} onClick={handleAdd}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="yellow"
                height="40"
                width="40"
                cursor="pointer"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg>
        </span>
    );
}

export default PopUpImage;
