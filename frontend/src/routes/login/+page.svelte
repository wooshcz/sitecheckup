<script>
    /** @type {import('./$types').PageData} */
    export let data;

    import { enhance } from "$app/forms";
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">{data.title}</h1>

        <div class="row">
            <div class="col-md-6 offset-md-3">
                <p class="text-xs-center">
                    <a href="/register">Don't have an account yet?</a>
                </p>

                {#if form?.errors}
                    <div id="alert" class="alert alert-warning" role="alert">
                        {#each Object.keys(form?.errors) as key}
                            {form?.errors[key]}<br />
                        {/each}
                    </div>
                {/if}

                <form use:enhance method="POST">
                    <div class="mb-3 form-floating">
                        <input class="form-control form-control" name="email" type="email" required placeholder="Email" />
                        <label for="email" class="form-label">Email address</label>
                    </div>
                    <div class="mb-3 form-floating">
                        <input class="form-control form-control" name="password" type="password" required placeholder="Password" />
                        <label for="password" class="form-label">Password</label>
                    </div>
                    <button class="btn btn-primary pull-xs-right" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</main>
