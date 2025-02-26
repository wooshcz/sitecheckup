<script>
    import { onMount } from 'svelte'
    import { invalidateAll } from '$app/navigation';

    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();

    onMount(() => {
        invalidateAll()
    })
</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">Logout</h1>

        <div class="row">
            <div class="col-md-6 offset-md-3">

                {#if data.result}
                    <div id="alert" class="alert alert-warning" role="alert">
                        {data.result}
                    </div>
                {/if}

            </div>
        </div>
    </div>
</main>
