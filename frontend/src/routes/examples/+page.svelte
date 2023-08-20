<script>
    /** @type {import('./$types').PageData} */
    export let data;

    import testssl_example1 from "$lib/assets/testssl-example1.png";
    import lighthouse_example1 from "$lib/assets/lighthouse_example1.png";
    import linkchecker_example1 from "$lib/assets/linkchecker_example1.png";
</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">{data.title}</h1>
        <div class="row">
            <div class="col">
                <div class="card">
                    <img src={lighthouse_example1} class="card-img-top" alt="Lighthouse Test Example" />
                    <div class="card-body">
                        <p class="card-text">Lighthouse test for https://www.strava.com/</p>
                        <a href={lighthouse_example1} class="btn btn-primary" target="_blank">View more</a>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src={linkchecker_example1} class="card-img-top" alt="Broken Links Test Example" />
                    <div class="card-body">
                        <p class="card-text">Broken Links test for https://en.wikipedia.org/wiki/Main_Page</p>
                        <a href={linkchecker_example1} class="btn btn-primary" target="_blank">View more</a>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src={testssl_example1} class="card-img-top" alt="SSL/TLS Test Example" />
                    <div class="card-body">
                        <p class="card-text">SSL/TLS test for https://dh512.badssl.com/</p>
                        <a href={testssl_example1} class="btn btn-primary" target="_blank">View more</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
