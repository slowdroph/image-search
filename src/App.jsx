import { useState } from "react";
import NotFound from "./pages/NotFound";
import PageDetails from "./pages/PageDetails";
import PageFavorites from "./pages/PageFavorites";
import Search from "./pages/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    const [favorites, setFavorite] = useState([]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route
                        index
                        path="search"
                        element={
                            <Search
                                favorites={favorites}
                                setFavorite={setFavorite}
                            />
                        }
                    />
                    <Route
                        path="favorites"
                        element={
                            <PageFavorites
                                favorites={favorites}
                                setFavorite={setFavorite}
                            />
                        }
                    />
                    <Route path="details" element={<PageDetails />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
