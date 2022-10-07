<script lang="ts">
	import { base } from '$app/paths';
	import rust_logo from '$lib/assets/rust-logo.svg';
</script>

<svelte:head>
	<title>An explorer for the targets Rust can compile to.</title>
	<meta name="description" content="An explorer for the targets Rust can compile to.">
</svelte:head>

<header class="grid grid-cols-3 justify-items-center rounded-lg shadow-xl mr-5 ml-5 bg-blue-800">
	<h1 class="text-5xl col-span-2 self-center m-auto">Rust Target Explorer</h1>
	<img class="justify-self-end mt-5 mr-5" src={rust_logo} alt="Rust logo" style="width:200px" />
</header>

<div class="grid grid-cols-1 m-5 bg-blue-700 p-5 rounded-lg">
	<a href="{base}/targets">
		<div class="text-3xl grid grid-cols-5">
			<h1 class="col-span-3 self-center text-4xl ml-4">Targets</h1>
            <div class="col-span-2 text-xl rounded-lg bg-blue-600 p-2">
                <h2 class="m-2 pb-3">Output of:</h2>
                <div class="rounded-lg bg-slate-800 m-3 p-3">
                    <code class="text-white">$ rustc --print target-list</code>
                </div>
            </div>
		</div>
	</a>
	<a href="{base}/cpu/">
		<div class="text-3xl grid grid-cols-5 mt-10">
			<h1 class="col-span-3 self-center text-4xl ml-4">CPUs</h1>
		</div>
	</a>
</div>
