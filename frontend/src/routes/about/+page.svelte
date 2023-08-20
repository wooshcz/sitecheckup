<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<main>
    <div class="container">
        <h1 class="text-primary-emphasis my-3">{data.title}</h1>
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Lighthouse Test</h5>
                        <p class="card-text">
                            Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or
                            requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO, and more.
                        </p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Performance audits</li>
                        <li class="list-group-item">Accessibility audits</li>
                        <li class="list-group-item">Best Practices audits</li>
                        <li class="list-group-item">SEO audits</li>
                        <li class="list-group-item">PWA audits</li>
                    </ul>
                    <div class="card-body">
                        <a href="https://developer.chrome.com/docs/lighthouse/overview/" class="btn btn-primary" target="_blank">Detailed description</a>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Broken Links Test</h5>
                        <p class="card-text">
                            Broken Links tool crawls the site and automatically detects broken link on your site and generates useful report which can be shared
                            with the content/editorial teams.
                        </p>
                        <p class="card-text">
                            This tool is based on an open-source product available for download at <a href="https://linkchecker.github.io/linkchecker/"
                            target="_blank">https://linkchecker.github.io/linkchecker/</a
                            >.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">SSL/TLS Test</h5>
                        <p class="card-text">
                            SSL/TLS test automatically checks a server's service on any port for the support of Transport Layer Security standards, ciphers,
                            protocols as well as recent cryptographic flaws and shows actionable list of findings.
                        </p>
                        <p class="card-text">
                            This tool is based on an open-source product available for download at <a href="https://testssl.sh/" target="_blank">https://testssl.sh/</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
