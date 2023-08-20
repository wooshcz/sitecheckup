<script>
	import { page } from "$app/stores";
</script>

<div class="container">
	<h1 class="text-primary-emphasis my-3">{$page.status} {$page.error.message}</h1>
</div>
