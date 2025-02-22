<script>
    import { enhance } from "$app/forms";

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">Welcome to SiteTest<sup>3</sup></h1>
        <div class="row">
            <div class="col-8">
                <form method="POST" use:enhance>
                    <div class="form-floating mb-3">
                        <input name="url" placeholder="www.example.org" id="input-url" class="form-control" required />
                        <label for="input-url">URL to test</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select name="type" id="input-type" class="form-select form-select-lg" required>
                            <option selected />
                            <option value="lighthouse">Lighthouse</option>
                            <option value="linkchecker">Broken Links</option>
                            <option value="testssl">SSL/TLS</option>
                        </select>
                        <label for="input-type">Type of test</label>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary btn-lg">Run</button>
                    </div>
                </form>

                {#if form?.success}
                    <div id="alert" class="alert alert-success" role="alert">Job {form.job_id} was successfully created!</div>
                {/if}
            </div>
            <div class="col-4">
                <div class="card text-bg-light mb-3">
                    <div class="card-header">Quick Start</div>
                    <div class="card-body">
                        <h5 class="card-title">How to use this tool?</h5>
                        <p class="card-text">
                            Just enter a full URL to the website you want to test (including protocol, port and path to a page) and click Run. The finished
                            report will be available on the Jobs page in a few moments.
                        </p>
                        <a href="/jobs" class="card-link">See completed tests</a>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Are you not sure which test you want to run?</h5>
                        <p class="card-text">Just head to the About section for detailed description of individual tests.</p>
                        <a href="/about" class="card-link">About tests</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
