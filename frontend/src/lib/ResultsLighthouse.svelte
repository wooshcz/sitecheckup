<script>
    let { results } = $props();
    const categories = [
    {
        key: "performance",
        desc: "Performance score of the site based on the Core Web Vitals framework.",
    },
    {
        key: "accessibility",
        desc: "These checks highlight opportunities to improve the accessibility of your web app.",
    },
    { key: "best-practices", desc: "Best practices score of the site." },
    {
        key: "seo",
        desc: "These checks ensure that your page is following basic search engine optimization advice.",
    },
    ];
    
    function formatScore(value, mult = 100, decimal = 0) {
        return Math.round(value * mult, decimal);
    }
    
    function scoreColor(value) {
        if (value > 0.75) {
            return "success";
        } else if (value > 0.5) {
            return "warning";
        } else if (value > 0.25) {
            return "danger";
        } else {
            return "dark";
        }
    }
    
    function extract_and_sort_audits(refs, audits) {
        let audits_sorted = [];
        if (refs) {
            for (const ref of refs) {
                if (audits[ref.id].score < 1) {
                    audits_sorted.push(audits[ref.id]);
                }
            }
        }
        return audits_sorted.sort((a, b) => a.score - b.score);
    }
    
    function parse_markdown(text) {
        const regex = /\[(.+?)\]\((.+?)\)/gi;
        return text.replaceAll(regex, '<a href="$2" target="_blank">$1</a>');
    }
</script>

<div class="container text-center">
    <div class="row">
        {#each categories as category}
        <div class="col">
            <div class="card">
                <div class="card-header">
                    {results.categories[category.key]?.title}
                </div>
                <div class="card-body">
                    <h2>
                        <span
                        class="badge text-bg-{scoreColor(
                        results.categories[category.key]?.score
                        )}"
                        >
                        {formatScore(results.categories[category.key]?.score)}
                    </span>
                </h2>
                <p class="card-text">{category.desc}</p>
                <button
                class="btn btn-primary"
                data-bs-toggle="collapse"
                data-bs-target="#collapse-{category.key}">Learn more</button
                >
            </div>
        </div>
    </div>
    {/each}
</div>
<div class="row">
    {#each categories as category}
    <div class="col collapse" id="collapse-{category.key}">
        <div class="my-3 card">
            <div class="card-header">
                {results.categories[category.key]?.title}
            </div>
            <div class="card-body">
                <table class="table text-start">
                    <thead>
                        <tr>
                            <th scope="col">Audit</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Score</th>
                            <th scope="col">Numeric Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each extract_and_sort_audits(results.categories[category.key]?.auditRefs, results.audits) as audit}
                        {#if ["numeric", "binary"].includes(audit.scoreDisplayMode)}
                        <tr>
                            <td>{audit.title}</td>
                            <td>{@html parse_markdown(audit.description)}</td>
                            <td>{audit.scoreDisplayMode}</td>
                            <td>{audit.score}</td>
                            <td>
                                {#if audit.scoreDisplayMode == "numeric"}
                                {formatScore(audit.numericValue, 1, 1)}
                                {audit.numericUnit}
                                {/if}
                            </td>
                        </tr>
                        {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    {/each}
</div>
</div>
