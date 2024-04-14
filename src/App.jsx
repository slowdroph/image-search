import { useEffect, useState } from "react";
import Header from "./Header";
import Images from "./Images";
import PopUpImage from "./PopUpImage";
import ErrorMessage from "./ErrorMessage";

export const KEY = "43052958-769930f656a0aedca25ffabd4";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function App() {
    const [image, setImage] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [hiddenPopUp, setHiddenPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            try {
                setIsLoading(true);

                if (debouncedQuery.length < 3) {
                    setImage([]);
                    setIsLoading(false);
                    setError(false);
                    return;
                }

                const req = await fetch(
                    `https://pixabay.com/api/?key=${KEY}&q=${debouncedQuery}`,
                    { signal: controller.signal }
                );
                const data = await req.json();

                if (data.hits.length === 0) {
                    setError(true);
                    setErrorMessage("No results found");
                } else {
                    setError(false);
                    setImage(data.hits);
                }
            } catch (error) {
                console.error(error);
                setError(true);
                setErrorMessage("An error occurred while fetching data");
            } finally {
                setIsLoading(false);
            }
        }

        getData();

        return () => {
            controller.abort();
            setError(false);
            setErrorMessage("");
        };
    }, [debouncedQuery]);

    function handleQuery(e) {
        setQuery(e.target.value);
    }

    function handleSelectImage(id) {
        setSelectedId((prevSelectedId) => (id === prevSelectedId ? null : id));
        setHiddenPopUp(true);
    }

    return (
        <>
            <Header HandleQuery={handleQuery} />

            {error ? (
                <ErrorMessage errorMessage={errorMessage} />
            ) : (
                <Images
                    image={image}
                    isLoading={isLoading}
                    onSelectImage={handleSelectImage}
                />
            )}

            {hiddenPopUp && (
                <PopUpImage
                    selectedId={selectedId}
                    isLoading={isLoading}
                    HandleCloseOverlay={setHiddenPopUp}
                    setIsLoading={setIsLoading}
                />
            )}
        </>
    );
}

export default App;
