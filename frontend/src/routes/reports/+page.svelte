<script>
    import List from "$lib/List.svelte";

    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();

</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">Results</h1>

        <List items={data.items} />

    </div>
</main>
