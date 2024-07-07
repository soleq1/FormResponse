<script>
  import { page } from "$app/stores";
  import { signIn,signOut } from "@auth/sveltekit/client";
  import Googlepill from "./googlepill.svelte";



// export let data;
const handleLogin = async () =>{

}

</script>



<div >

    <div class="flex justify-between text-white mx-10 my-5 items-center">
        <h2 class="text-3xl">FormResponse</h2>
    {#if !$page.data.session}
    <button on:click={() => signIn("google")} class="text-3xl"><Googlepill/></button>
    {:else}
    <div class="flex items-center">

        <button  on:click={() => signOut()}>{$page.data.session.user?.name}</button>
        <img class="rounded-full" src={$page.data.session.user?.image} alt={$page.data.session.user?.name}/>
    </div>
    {/if}
</div>
</div>