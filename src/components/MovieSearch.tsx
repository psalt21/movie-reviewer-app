import Image from "next/image";
import { useEffect, useState } from "react";

interface MovieData {
    id: number;
    titleText: {text: string};
    primaryImage: {url: string};
}

export default function MovieSearch() {
    const [data, setData] = useState<MovieData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/movie-db-api?type=title_search&title=carla&exact=false&title_type=movie');
            const data = await response.json();
            setData(data.results);
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <>
        <h3>Movie Search</h3>
        <div className="grid grid-cols-3 gap-4">
            {data.map((item) => (
                <div key={item.id} className="w-full">
                    <div className="rounded overflow-hidden shadow-lg">
                        <div>
                            <Image className="object-cover" src={item.primaryImage.url} alt="movie poster" width="100" height="100" />
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item.titleText.text}</div>
                            <p className="text-gray-700 text-base">plot will go here.</p>                           
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}
