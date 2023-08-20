<script>
    import { page } from "$app/stores";
</script>

<svelte:head>
    <title>{$page.data.title} - {$page.data.application}</title>
</svelte:head>

<div class="container">
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">SiteCheckup</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" class:active={$page.url.pathname === "/"} href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" class:active={$page.url.pathname === "/examples"} href="/examples">Examples</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" class:active={$page.url.pathname === "/jobs"} href="/jobs">Results</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" class:active={$page.url.pathname === "/about"} href="/about">About</a>
                    </li>
                </ul>
                <ul class="navbar-nav me-2 mb-2 mb-lg-0">
                    {#if $page.data.user}
                        <li class="nav-item">
                            <a
                                href="/profile/{$page.data.user.email}"
                                class="nav-link fw-bold"
                                class:active={$page.url.pathname === "/profile/" + $page.data.user.email}>{$page.data.user.name}</a
                            >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" class:active={$page.url.pathname === "/jobs"} href="/jobs">Results</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" class:active={$page.url.pathname === "/settings"} href="/settings">Settings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" class:active={$page.url.pathname === "/logout"} href="/logout">Logout</a>
                        </li>
                    {:else}
                        <li class="nav-item">
                            <a class="btn btn-outline-primary me-2" class:active={$page.url.pathname === "/login"} href="/login">Sign in</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn btn-outline-success" class:active={$page.url.pathname === "/register"} href="/register">Register</a>
                        </li>
                    {/if}
                </ul>
            </div>
        </div>
    </nav>
</div>

<slot />
