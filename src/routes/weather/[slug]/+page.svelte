<script lang="ts">
    import LocationSearchBox from "$lib/LocationSearchBox.svelte";
    import TemperatureUnitSelector from "$lib/TemperatureUnitSelector.svelte";
    import UNIT_TEMPERATURE from "$lib/stores/unitTemperature";
    import type { PageData } from "./$types";

    

    export let data: PageData;
    export const DEG = "°";
    export const AQI_LABELS = [
        "Great",
        "Fair",
        "Moderate",
        "Poor",
        "Very Poor",
    ];
    export const AQI = AQI_LABELS[data.current.air_quality["us-epa-index"] - 1];
    export function toShortDate(date: string): string {
        // had to add T00:00 or JS will make it off by one day :/
        return new Date(`${date}T00:00`).toLocaleString(undefined, {
            weekday: "short",
            day: "numeric",
        });
    }
    export function clientTemperature(object: any, key: string, unit: string) {
        return object[`${key}_${unit.toLowerCase()}`];
    }

    $: unitTemperature = $UNIT_TEMPERATURE;
</script>

<h2>
    Simple Weather <LocationSearchBox />
    <TemperatureUnitSelector />
</h2>

<h2>{data.location.name} <span id="date">{data.last_updated}</span></h2>
<p>
    It is currently {Math.round(
        unitTemperature === "F" ? data.current.temp_f : data.current.temp_c
    )}{DEG}{unitTemperature} and {data.current.condition.text}. Feels like {Math.round(
        clientTemperature(data.current, "feelslike", unitTemperature)
    )}{DEG}.
</p>
<p>
    High of {Math.round(clientTemperature(data.forecast.forecastday[0].day, "maxtemp", unitTemperature))}{DEG} and Low
    of {Math.round(clientTemperature(data.forecast.forecastday[0].day, "mintemp", unitTemperature))}{DEG}.
</p>
<p>
    Air quality is {AQI}. UV index is {data.current.uv}.
    {data.current.wind_mph} mph winds {data.current.wind_dir}.
    {data.current.humidity}% humidity.<br />
    {data.current.vis_miles} mi. visibility.
    {data.current.pressure_in} in. pressure.
    <!-- TODO dewpoint -->
</p>
<h2>Forecast</h2>
<div class="scrollwrapper">
    <table>
        <thead>
            <tr>
                <td>Day</td>
                <td>High</td>
                <td>Low</td>
                <td>Condition</td>
                <td>Precip.</td>
                <td>UV</td>
            </tr>
        </thead>
        <tbody>
            {#each data.forecast.forecastday as day}
                <tr>
                    <td>{toShortDate(day.date)}</td>
                    <td>{Math.round(clientTemperature(day.day, "maxtemp", unitTemperature))}{DEG}</td>
                    <td>{Math.round(clientTemperature(day.day, "mintemp", unitTemperature))}{DEG}</td>
                    <td>{day.day.condition.text}</td>
                    <td>{day.day.daily_chance_of_rain}%</td>
                    <td>{day.day.uv}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
<p>
    Weather data by <a
        href="https://www.weatherapi.com/"
        target="_blank"
        title="Opens in a new tab.">WeatherAPI.com</a
    >.
</p>

<style>
    #date {
        font-size: initial;
        font-weight: initial;
    }
</style>
