import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { KEY } from "./Search";
import styles from "./PageFavorites.module.css";

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
                    localStorage.setItem("favorites", JSON.stringify(hits));
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
            <h1 className={styles.header}>Your favorites</h1>
            <Myfavorites mainFavs={mainFavs} removeFavorite={removeFavorite} />
        </>
    );
}

function Myfavorites({ mainFavs, removeFavorite }) {
    return (
        <ul className={styles.lista}>
            {mainFavs.map((fav) => (
                <FavList
                    key={fav.id}
                    mainFav={fav}
                    removeFavorite={removeFavorite}
                />
            ))}
        </ul>
    );
}

function FavList({ mainFav, removeFavorite }) {
    function handleRemoveFavorite() {
        removeFavorite(mainFav.id);
    }

    return (
        <li className={styles.list_item}>
            <img src={mainFav.largeImageURL} alt={mainFav.tags} />
            <a className={styles.link} href={mainFav.pageURL} target="_blank" rel="noopener noreferrer">
                Source
            </a>
            <button className={styles.btn} onClick={handleRemoveFavorite}>⛔</button>
        </li>
    );
}

export default PageFavorites;
