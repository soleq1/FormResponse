<script>
  import { page } from "$app/stores";
  import { signIn,signOut } from "@auth/sveltekit/client";
  import Googlepill from "./googlepill.svelte";

 let profile = false

// export let data;
const handleLogin = async () =>{

}
$:console.log(profile)
</script>



<div >

    <div class="flex justify-between text-white mx-4 my-3 items-center bg-blue-900/30 px-8 p-1 rounded-l-xl rounded-r-xl">
        <h2 class="text-4xl font-bold"><a href="/"> FormResponse </a> </h2>
    {#if !$page.data.session}
    <button on:click={() => signIn("google")} class="text-3xl"><Googlepill/></button>
    {:else}
    <div class="flex items-center bg-blue-900/">

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img on:click={() => profile = !profile} class="rounded-full cursor-pointer" src={$page.data.session.user?.image} alt={$page.data.session.user?.name}/>
        {#if profile == true}
        <div class=" animate-bounce-once 1s ease-in absolute mt-52 right-4 border-2 border-zinc-3    bg-blue-900/30 py-2 rounded-lg ">

            <p>{$page.data.session.user?.name}</p>
            <p class="al ">{$page.data.session.user?.email}
            <button class="block  p-1 px-2 rounded-lg border-2 bg-red-400 "  on:click={() => signOut()}>Log Out</button>
        </div>
        {/if}
    
    </div>
    {/if}
</div>
</div>