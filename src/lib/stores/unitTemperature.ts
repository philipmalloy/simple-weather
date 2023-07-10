import { browser } from "$app/environment";
import { writable } from "svelte/store";

const DEFAULT_UNIT = "F";

const UNIT_TEMPERATURE = writable(
    browser ? window.localStorage.getItem("unitTemperature") ?? DEFAULT_UNIT : DEFAULT_UNIT
);
UNIT_TEMPERATURE.subscribe((value) => {
    if (browser) window.localStorage.setItem("unitTemperature", value);
});
export default UNIT_TEMPERATURE;
