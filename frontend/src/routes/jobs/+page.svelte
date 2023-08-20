<script>
    import List from "$lib/List.svelte";

    /** @type {import('./$types').PageData} */
    export let data;

</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">Results</h1>

        <List items={data.items} />

    </div>
</main>
