import { useEffect, useState } from "react";

interface MovieData {
    id: number;
    titleText: {text: string}
}

export default function MovieSearch() {
    const [data, setData] = useState<MovieData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/movie-db-api?type=title_search&title=rocky&exact=false&title_type=movie');
            const data = await response.json();
            setData(data.results);
        }
        fetchData();
    }, []);

    return (
        <>
            <h3>Movie Search</h3>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.titleText.text}</li>
                ))}
            </ul>
        </>
    );
}
