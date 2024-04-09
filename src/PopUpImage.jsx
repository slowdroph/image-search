import { useEffect, useState } from "react";
import styles from "./PopUpImage.module.css";

function PopUpImage({ KEY, selectedId, HandleCloseOverlay }) {
    const [Image, SetImage] = useState([]);

    useEffect(
        function () {
            async function getImageDetails() {
                const res = await fetch(
                    `https://pixabay.com/api/?key=${KEY}&id=${selectedId}`
                );
                const data = await res.json();
                SetImage(data.hits[0]);
            }
            getImageDetails();
        },

        [selectedId]
    );
    return (
        <>
            <span
                onClick={() => HandleCloseOverlay(false)}
                className={styles.overlay}
            ></span>
            <div className={styles.content}>
                <div className={styles.data}>
                    <img
                        className={styles.img}
                        src={Image.largeImageURL}
                        key={selectedId}
                    />
                    <div className={styles.external}>
                        <a
                            className={styles.link}
                            href={Image.pageURL}
                            target="_blank"
                            rel="external"
                        >
                            Link Original
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpImage;
