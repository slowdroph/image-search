import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { KEY } from "./Search";
import styles from "./PageFavorites.module.css";
import { Link } from "react-router-dom";

function PageFavorites({ favorites, setFavorite }) {
    const [mainFavs, setMainFavs] = useState([]);

    useEffect(() => {
        const savedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorite(savedFavorites);
    }, [setFavorite]);

    function removeFavorite(idToRemove) {
        const updatedFavorites = favorites.filter(
            (fav) => fav.id !== idToRemove
        );
        setFavorite(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    useEffect(() => {
        async function getFavorites() {
            try {
                if (favorites && favorites.length > 0) {
                    const hits = [];
                    for (const favorite of favorites) {
                        const res = await fetch(
                            `https://pixabay.com/api/?key=${KEY}&id=${favorite.id}`
                        );
                        const data = await res.json();
                        hits.push(...data.hits);
                    }
                    setMainFavs(hits);
                } else {
                    setMainFavs([]);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getFavorites();
    }, [favorites]);

    return (
        <>
            <PageNav />
            <HeaderCount mainFavs={mainFavs} />
            {mainFavs.length === 0 ? (
                <EmptyMessage />
            ) : (
                <Myfavorites
                    mainFavs={mainFavs}
                    removeFavorite={removeFavorite}
                />
            )}
        </>
    );
}

function HeaderCount({ mainFavs }) {
    return (
        <header className={styles.header}>
            <span className={styles.star}>{mainFavs.length}</span>
            <h1 className={styles.heading}>Your favorites</h1>
            <span className={styles.star}>{mainFavs.length}</span>
        </header>
    );
}

function Myfavorites({ mainFavs, removeFavorite }) {
    return (
        <ul className={styles.lista}>
            {mainFavs.map((fav) => (
                <li key={fav.id} className={styles.list_item}>
                    <img src={fav.largeImageURL} alt={fav.tags} />
                    <a
                        className={styles.link}
                        href={fav.pageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Source
                    </a>
                    <button
                        onClick={() => removeFavorite(fav.id)}
                        className={styles.btn}
                    >
                        ⛔
                    </button>
                </li>
            ))}
        </ul>
    );
}

function EmptyMessage() {
    return (
        <p className={styles.emptymsg}>
            It seems like you have no favorites yet, try to add some by clicking{" "}
            <Link className={styles.route} to="/search">
                here
            </Link>
        </p>
    );
}

export default PageFavorites;
