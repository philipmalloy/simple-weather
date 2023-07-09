import { WEATHER_API_KEY } from '$env/static/private';

const BASE_URL = "https://api.weatherapi.com/";
const URL_WEATHER_CURRENT = `${BASE_URL}v1/current.json?key=${WEATHER_API_KEY}`;
const URL_WEATHER_FORECAST = `${BASE_URL}v1/forecast.json?key=${WEATHER_API_KEY}&days=3&aqi=yes`;
const URL_WEATHER_SEARCH = `${BASE_URL}v1/search.json?key=${WEATHER_API_KEY}`;

/**
 * @param query Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name.
 * @returns A JSON object with current weather data of the query.
 */
export async function getWeatherCurrent(query: string) {
    const weatherResponse = await fetch(`${URL_WEATHER_CURRENT}&q=${query}`);
    return weatherResponse.json();
}

/**
 * @param query Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name.
 * @returns A JSON object with current weather data of the query, including forecast.
 */
export async function getWeatherForecast(query: string) {
    const weatherResponse = await fetch(`${URL_WEATHER_FORECAST}&q=${query}`);
    return weatherResponse.json();
}

/**
 * @param query Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name.
 * @returns A JSON array containing location objects matching the query.
 */
export async function getWeatherSearchResults(query: string) {
    const weatherResponse = await fetch(`${URL_WEATHER_SEARCH}&q=${query}`);
    return weatherResponse.json();
}

