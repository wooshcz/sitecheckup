<script>
    let { items } = $props();
</script>

<table class="table table-striped">
    <thead>
        <tr>
            <th>#</th>
            <th scope="col">Job ID</th>
            <th scope="col">Type</th>
            <th scope="col">URL</th>
            <th scope="col">Created</th>
            <th scope="col">Status</th>
        </tr>
    </thead>
    <tbody>
        {#if items}
            {#each items as item, i}
                <tr>
                    <td>{i + 1}</td>
                    <td><a href="/reports/{item.job_id}">{item.job_id}</a></td>
                    <td>{item.type}</td>
                    <td>{item.url}</td>
                    <td>{item.created}</td>
                    <td>{item.status}</td>
                </tr>
            {/each}
        {:else}
            <tr>
                <td colspan="6" class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>
        {/if}
    </tbody>
</table>
