import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // First validate the request query params
    const { query } = req;

    // determine which API endpoint to hit based on the query params
    let endpoint;
    switch (query?.type) {
        case 'title_search':
            if (!query?.title) {
                res.status(400).json({ error: 'Missing title parameter' });
                return;
            }
            
            if (query?.year && !Number.isInteger(parseInt(`${query.year}`))) {
                res.status(400).json({ error: 'Title search year must be a number representing a valid year' });
                return;
            }

            // handle optional movie search query params
            const exactValue = query?.exact ?? false;
            const titleTypeValue = query?.title_type ?? 'movie';
            const yearValue = query?.year ?? null;

            endpoint =  `https://moviesdatabase.p.rapidapi.com/titles/search/title/${query.title}?exact=${exactValue}&titleType=${titleTypeValue}`;

            if (yearValue) endpoint += `&year=${yearValue}`;

            break;
        default:
            res.status(400).json({ error: 'Invalid movie api request type parameter' });
            return;
    }

    // make request to external movie data API
    const response = await fetch(
        endpoint,
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        }
    );
    const data = await response.json();
    return res.status(200).json(data);
}
