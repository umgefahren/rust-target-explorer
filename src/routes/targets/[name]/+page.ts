import { error } from '@sveltejs/kit'
import type { Target } from '$lib/target'
import targets from "$lib/assets/data/data.json"


const ts: Map<string, Target> = new Map()

targets.map((t) => ts.set(t.name, t))


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const name = params.name
    return ts.get(name)
}