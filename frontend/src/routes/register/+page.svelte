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
                {#if form?.errors}
                    <ul class="error-messages">
                        {#each Object.keys(form?.errors) as key}
                            <li>{key} {form?.errors[key]}</li>
                        {/each}
                    </ul>
                {/if}

                <form use:enhance method="POST">
                    <div class="mb-3 form-floating">
                        <input class="form-control form-control" name="name" type="text" required placeholder="Your Name" />
                        <label for="name" class="form-label">Your Name</label>
                    </div>
                    <div class="mb-3 form-floating">
                        <input class="form-control form-control" name="email" type="email" required placeholder="Email" />
                        <label for="email" class="form-label">Email address</label>
                    </div>
                    <div class="mb-3 form-floating">
                        <input class="form-control form-control" name="password" type="password" required placeholder="Password" />
                        <label for="password" class="form-label">Password</label>
                    </div>
                    <button class="btn btn-primary pull-xs-right" type="submit">Register</button>
                </form>
            </div>
        </div>
    </div>
</main>
