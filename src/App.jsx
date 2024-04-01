import { useEffect, useState } from "react";
import Header from "./Header";
import Images from "./Images";

const KEY = "43052958-769930f656a0aedca25ffabd4";

function App() {
    const [image, SetImage] = useState([]);
    const [query, SetQuery] = useState("");
    console.log(query);

    function HandleQuery(e) {
        SetQuery(e.target.value);
    }

    useEffect(
        function () {
            const controller = new AbortController();

            async function GetData() {
                try {
                    const req = await fetch(
                        `https://pixabay.com/api/?key=${KEY}&q=${query}`,
                        { signal: controller.signal }
                    );
                    const data = await req.json();
                    
                    SetImage(data.hits);
                    console.log(data.hits);
                } catch (error) {
                    console.error(error);
                }

                if(query.length < 3){
                    SetImage([])
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
            <Images image={image} />
        </>
    );
}

export default App;
