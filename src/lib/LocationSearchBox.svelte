<script lang="ts">
    import { goto } from "$app/navigation";

    export let searchValue = "";
    export let results: any[] = [];
    export async function handleSearch(event: KeyboardEvent) {
        if (event.key != "Enter") return;
        if (searchValue.length === 0) return (results = []);
        let response = await fetch(`/api/getSearchResults/${searchValue}`);
        let responseJson = await response.json();
        // console.log(responseJson);
        // if one result, go to it and clear search box
        if (responseJson.length === 1) {
            goto(`/weather/${responseJson[0].url}`);
            searchValue = "";
            results = [];
        } else if (responseJson.length > 1) {
            results = responseJson;
        } else {
            results = [];
        }
    }
    export function clearSearchandResults() {
        searchValue = "";
        results = [];
    }
</script>

<input
    type="search"
    placeholder="Search location..."
    size="15"
    bind:value={searchValue}
    on:keydown={handleSearch}
/>
{#if results.length > 0}
    <ul>
        {#each results as { name, region, country, url }}
            <li>
                <a href={url} on:click={clearSearchandResults}
                    >{name}, {region}, {country}</a
                >
            </li>
        {/each}
    </ul>
{/if}

<style>
    input {
        background-color: inherit;
        color: inherit;
        border: 1px dashed var(--gray-color);
        font-family: inherit;
    }
    ul {
        list-style-type: square;
    }
    li {
        font-size: initial;
        font-weight: initial;
        line-height: 1.5;
    }
</style>
