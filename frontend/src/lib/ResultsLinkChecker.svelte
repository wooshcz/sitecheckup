<script>
    import { onMount } from "svelte";

    export let results;

    function severityColor(severity) {
        if (severity === 0) {
            return "danger";
        } else {
            return "success";
        }
    }

    function filterBySeverity(list, severity) {
        return list.filter((it) => it.valid == severity);
    }

    function translateExternal(value) {
        if (value === 1) {
            return "External";
        } else {
            return null;
        }
    }

    onMount(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
    });
</script>

{#each [{ label: "Invalid", value: 0 }, { label: "Valid", value: 1 }] as { label, value }}
    {#if filterBySeverity(results, value).length > 0}
        <div class="my-2 card">
            <div class="card-header">
                {label} Links
                <button class="btn btn-sm btn-{severityColor(value)} mx-2 align-middle" data-bs-toggle="collapse" data-bs-target="#collapse{label}">
                    {filterBySeverity(results, value).length}
                </button>
            </div>
            <div class="card-body collapse" id="collapse{label}">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Link URL</th>
                            <th scope="col">Link Name</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each filterBySeverity(results, value) as results}
                            <tr>
                                <td class="text-break">{results.url}</td>
                                <td>
                                    {#if results.name}{results.name}{/if}
                                </td>
                                <td>
                                    {#if translateExternal(results.extern)}
                                        <div class="btn btn-outline-primary btn-sm mx-1">{translateExternal(results.extern)}</div>
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
