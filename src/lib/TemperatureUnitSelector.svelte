<script lang="ts">
    import UNIT_TEMPERATURE from "./stores/unitTemperature";
    $: unitTemperature = $UNIT_TEMPERATURE;
    export function handleClick() {
        if (unitTemperature === "F") UNIT_TEMPERATURE.set("C");
        else UNIT_TEMPERATURE.set("F");
    }
</script>

<button on:click={handleClick}>°{unitTemperature}</button>
