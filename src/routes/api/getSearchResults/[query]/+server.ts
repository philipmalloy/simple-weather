import type { RequestHandler } from '../$types';
import { getWeatherSearchResults } from '$lib/server/weatherApi';
import { json } from '@sveltejs/kit';

// Used for getting location search results.

export const GET = (async ({ params }) => {
    const weatherJson = await getWeatherSearchResults(params.query);

    return new Response(JSON.stringify(weatherJson, null, 4), {
        status: 200,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });
}) satisfies RequestHandler;
