<script>
    

    import ResultsTestSSL from "$lib/ResultsTestSSL.svelte";
    import ResultsLighthouse from "$lib/ResultsLighthouse.svelte";
    import ResultsLinkChecker from "$lib/ResultsLinkChecker.svelte";
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">{data.item.url}</h1>
        <h5 class="text-primary-subtle my-3">{data.item.type} &mdash; {data.item.job_id}</h5>

        {#if data.item}
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Parameter</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Type</th>
                        <td>{data.item.type}</td>
                    </tr>
                    <tr>
                        <th scope="row">Created</th>
                        <td>{data.item.created}</td>
                    </tr>
                    <tr>
                        <th scope="row">URL</th>
                        <td>{data.item.url}</td>
                    </tr>
                    <tr>
                        <th scope="row">Status</th>
                        <td>{data.item.status}</td>
                    </tr>
                </tbody>
            </table>
            {#if data.item.results}
                <h3 class="text-primary-emphasis my-3">Results</h3>
                {#if data.item.type == "lighthouse"}
                    <ResultsLighthouse results={data.item.results} />
                {:else if data.item.type == "testssl"}
                    <ResultsTestSSL results={data.item.results} />
                {:else if data.item.type == "linkchecker"}
                    <ResultsLinkChecker results={data.item.results.urldata} />
                {/if}
            {/if}
        {:else}
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        {/if}
    </div>
</main>
