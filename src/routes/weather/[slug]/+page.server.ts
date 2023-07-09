import type { PageServerLoad } from './$types';
import { getWeatherForecast } from '$lib/server/weatherApi';

export const load = (async ({ params }) => {
    const weatherJson = await getWeatherForecast(params.slug);

    weatherJson.last_updated = new Date(
        weatherJson.current.last_updated
    ).toLocaleString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return weatherJson;
}) satisfies PageServerLoad;
