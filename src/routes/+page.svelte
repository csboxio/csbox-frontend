<script lang="ts">
	import { page } from '$app/stores';
	import Account from '$lib/components/Account.svelte';
	import { getContext, onMount } from "svelte";
	import { notificationStore } from "../lib/stores/stores.js";
	import Auth from "$lib/components/Auth/Auth.svelte";
	import { goto, invalidateAll } from "$app/navigation";
	import Code from "$lib/components/OAuth/Code.svelte";
	import { DarkMode } from "flowbite-svelte";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
	import Home from "$lib/stellar/Home.svelte";

	export let data

	let { supabase } = data
	$: ({ supabase } = data)

	const handleSignOut = async () => {
		await supabase.auth.signOut()
	}

	//let notifications = getContext($page.data.session);

	let notifications;

	onMount(() => {
		const unsubscribe = notificationStore.subscribe(value => {
			notifications = value;
		});

		return unsubscribe;

	});

	let tab
	$: tab
</script>

<style>

</style>

<Home/>


