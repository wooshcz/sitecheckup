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
                        <th scope="row">Name</th>
                        <td>{data.item.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>{data.item.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">Created</th>
                        <td>{data.item.created}</td>
                    </tr>
                    <tr>
                        <th scope="row">Last logged in</th>
                        <td>{data.item.last_logged_in}</td>
                    </tr>
                    <tr>
                        <th scope="row">Number of jobs</th>
                        <td>{data.item.count_of_jobs}</td>
                    </tr>
                </tbody>
            </table>
        {:else}
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        {/if}
    </div>
</main>
