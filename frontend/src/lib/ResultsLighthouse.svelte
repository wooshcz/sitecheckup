<script>
    import { marked } from "marked";

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
        if (!text) return "";

        try {
            marked.setOptions({
                breaks: true,
                gfm: false,
                sanitize: false,
                silent: true,
            });

            let parsed = marked.parse(text);

            parsed = parsed.replace(/<a href=/g, "<a href=");
            parsed = parsed.replace(
                /<a href="([^"]*)"([^>]*)>/g,
                '<a href="$1" target="_blank" rel="noopener noreferrer"$2>',
            );

            if (
                parsed.startsWith("<p>") &&
                parsed.endsWith("</p>") &&
                (parsed.match(/<p>/g) || []).length === 1
            ) {
                parsed = parsed.slice(3, -4);
            }

            return parsed;
        } catch (error) {
            console.warn("Markdown parsing error:", error);
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }
    }

    function getApplicableAudits(category) {
        const allAudits = extract_and_sort_audits(
            results.categories[category.key]?.auditRefs,
            results.audits,
        );
        return allAudits.filter(
            (audit) => !["notApplicable"].includes(audit.scoreDisplayMode),
        );
    }

    function toggleCollapse(targetCategoryKey) {
        const targetDiv = document.getElementById(
            `collapse-${targetCategoryKey}`,
        );
        const isTargetVisible =
            targetDiv && targetDiv.classList.contains("show");

        // If target is already visible, just hide it
        if (isTargetVisible) {
            const bsCollapse = new bootstrap.Collapse(targetDiv, {
                toggle: false,
            });
            bsCollapse.hide();
            return;
        }

        // Find any currently open div and close it first
        let openDiv = null;
        let openCollapse = null;

        categories.forEach((category) => {
            if (category.key !== targetCategoryKey) {
                const collapseDiv = document.getElementById(
                    `collapse-${category.key}`,
                );
                if (collapseDiv && collapseDiv.classList.contains("show")) {
                    openDiv = collapseDiv;
                    openCollapse = new bootstrap.Collapse(collapseDiv, {
                        toggle: false,
                    });
                }
            }
        });

        // If there's an open div, wait for it to close before opening the target
        if (openDiv && openCollapse) {
            openDiv.addEventListener(
                "hidden.bs.collapse",
                function showTarget() {
                    openDiv.removeEventListener(
                        "hidden.bs.collapse",
                        showTarget,
                    );
                    const targetCollapse = new bootstrap.Collapse(targetDiv, {
                        toggle: false,
                    });
                    targetCollapse.show();
                },
            );
            openCollapse.hide();
        } else {
            // No open div, directly show the target
            const bsCollapse = new bootstrap.Collapse(targetDiv, {
                toggle: false,
            });
            bsCollapse.show();
        }
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
                                    results.categories[category.key]?.score,
                                )}"
                            >
                                {formatScore(
                                    results.categories[category.key]?.score,
                                )}
                            </span>
                        </h2>
                        <p class="card-text">{category.desc}</p>
                        <button
                            class="btn btn-primary"
                            onclick={() => toggleCollapse(category.key)}
                            >{getApplicableAudits(category).length} findings</button
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
                                {#each getApplicableAudits(category) as audit}
                                    <tr>
                                        <td>{audit.title}</td>
                                        <td
                                            >{@html parse_markdown(
                                                audit.description,
                                            )}</td
                                        >
                                        <td>{audit.scoreDisplayMode}</td>
                                        <td>{audit.score}</td>
                                        <td>
                                            {#if audit.scoreDisplayMode == "numeric"}
                                                {formatScore(
                                                    audit.numericValue,
                                                    1,
                                                    1,
                                                )}
                                                {audit.numericUnit}
                                            {/if}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
