<script>
    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">{data.title}</h1>
        <div class="row"></div>
    </div>
</main>
