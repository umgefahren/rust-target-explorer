<script lang="ts">
    import cpus from "$lib/assets/data/cpus.json"
    const arch = Array.from(new Set(cpus.map((cpu) => cpu.arch)))
</script>


<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg breadcrumbs">
		<ul>
            <li><a href="/">Home</a></li>
			<li><a href="/cpu/">CPU</a></li>
		</ul>
	</div>
</div>

<div class="p-4">
    <div class="bg-blue-300 p-2 rounded-lg">
        <h1>Architectures:</h1>
        <ul class="list-disc list-inside">
            {#each arch as a}
                <li><a href="/cpu/{a}/">{a}</a></li>
            {/each}
        </ul>
    </div>
</div>
