import { useEffect, useState } from "react";
import Header from "./Header";
import Images from "./Images";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PopUpImage from "./PopUpImage";
import Loader from "./Loader";

const KEY = "43052958-769930f656a0aedca25ffabd4";

function App() {
    const [image, SetImage] = useState([]);
    const [query, SetQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [hiddenPopUp, setHiddenPopUp] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    console.log(query);

    function HandleQuery(e) {
        SetQuery(e.target.value);
    }

    function handleSelectImage(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
        setHiddenPopUp(true);
    }

    <BrowserRouter>
        <Routes>
            <Route path="/imagem" element={<PopUpImage />} />
        </Routes>
    </BrowserRouter>;

    useEffect(
        function () {
            const controller = new AbortController();

            async function GetData() {
                try {
                    setIsloading(true);
                    const req = await fetch(
                        `https://pixabay.com/api/?key=${KEY}&q=${query}`,
                        { signal: controller.signal }
                    );
                    const data = await req.json();

                    SetImage(data.hits);
                    console.log(data.hits);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsloading(false);
                }

                if (query.length < 3) {
                    SetImage([]);
                }
            }
            GetData();

            return () => {
                controller.abort();
            };
        },
        [query]
    );

    return (
        <>
            <Header HandleQuery={HandleQuery} />

            <Images
                image={image}
                isLoading={isLoading}
                onSelectImage={handleSelectImage}
            />

            {hiddenPopUp && (
                <PopUpImage
                    KEY={KEY}
                    selectedId={selectedId}
                    HandleCloseOverlay={setHiddenPopUp}
                />
            )}
        </>
    );
}

export default App;
