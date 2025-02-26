<script>
    let { results } = $props();

    function severityColor(severity) {
        if (severity === "CRITICAL") {
            return "dark";
        } else if (severity === "HIGH") {
            return "danger";
        } else if (severity === "MEDIUM") {
            return "warning";
        } else if (severity === "LOW") {
            return "primary";
        } else {
            return "light";
        }
    }

    function filterBySeverity(list, severity) {
        return list.filter((it) => it.severity == severity);
    }
</script>

{#each ["CRITICAL", "HIGH", "MEDIUM", "LOW"] as severity}
    {#if filterBySeverity(results, severity).length > 0}
        <div class="my-2 card">
            <div class="card-header">
                '{severity}' Severity Findings
                <button class="btn btn-sm btn-{severityColor(severity)} mx-2 align-middle" data-bs-toggle="collapse" data-bs-target="#collapse{severity}">
                    {filterBySeverity(results, severity).length}
                </button>
            </div>
            <div class="card-body collapse" id="collapse{severity}">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Finding</th>
                            <th scope="col">IP Address</th>
                            <th scope="col">CVEs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each filterBySeverity(results, severity) as results}
                            <tr>
                                <td>{results.id}</td>
                                <td>{results.finding}</td>
                                <td>{results.ip}</td>
                                <td>
                                    {#if results.cve}
                                        {#each results.cve.split(" ") as cve}
                                            <a
                                                class="btn btn-outline-primary btn-sm mx-1"
                                                href="https://cve.mitre.org/cgi-bin/cvename.cgi?name={cve}"
                                                target="_blank"
                                                role="button">{cve}</a
                                            >
                                        {/each}
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
{/each}
