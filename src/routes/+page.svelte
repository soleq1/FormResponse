<script lang="ts">
  import { page } from "$app/stores";
  import { codingSkillsForm,codingSkillsForm2,FeedBack } from "$lib/array";
  import Googlepill from "$lib/components/googlepill.svelte";
import {captureScreenShot} from "$lib/filedownload"
  import { signIn } from "@auth/sveltekit/client";
  import type { Question,Response,Focus } from "../types";
  import Feedback from "$lib/feedback.svelte";

  


let Title = ""
let tempquestion:String = ""
let tempRating = false
let addResponse = false
let addComments = false

let responses:Response[] = []
const handleQuestions = (input:String) =>{
    // e.preventDefault()
    if (tempquestion != ""){
        let bothResponse = tempRating && addResponse && addComments
        if (addResponse == true || tempRating == true || addComments == true){
            
            const newQuestion:Question = {
                id: responses.length +1,
                question: input,
                response: addResponse ? "": undefined ,
                rating: tempRating ? 0: undefined,
                comments : addComments ? "": undefined,
                focused:false
    
            }
            if (bothResponse){
                newQuestion.response = "",
                newQuestion.rating = 0
            }
            responses = [...responses,newQuestion]
            tempquestion = ""
            tempRating = false
            addResponse = false
            addComments = false

        }
    }else{
        alert("Requires at least 1 Response")
    }
}


const handlePreset = (input:Question[]) =>{
    responses = input
}   

// CUSTOMIZE VARIABLES
let alignment:String = "left"
let bold = false
let currentFocus:Focus = {type: null, index:null}
let deleteInProgress = false
let downloaded = false
let titleFocus = false
let signature = false
let signatureText:String = '';

let screenshot: any;
const handleDownloading = async () =>{
    try{
        downloaded = true   
        await captureScreenShot(screenshot)
    } catch(error){
        console.log(error)
    }finally{
        downloaded = false
    }
}
const handleAlignment = (align:String) =>{
    alignment = align
    titleFocus = true
 
}   
const handleBlur = (index:any) =>{
    if (deleteInProgress){
        return;
    }
    setTimeout(() => {
            if (currentFocus.index === index) {
                responses[index].focused = false;
                currentFocus = { type: null, index: null };
            }
        }, 300);
    
}
const handleFocus = (index:number| null, type: keyof Response) =>{
    
    currentFocus = {type,index}
    responses = responses.map((item, i) => ({
            ...item,
            focused: i === index
        }));
}
const handleDelete = () => {
    deleteInProgress = true
    const { type, index } = currentFocus;
    if (type && index !== null && index >= 0 && index < responses.length) {
        (responses[index] as any)[type] = undefined;
        responses[index].focused = false;
        currentFocus = { type: null, index: null };
        deleteInProgress = false
    }
};

    // $:console.log($page.data.session?.user)
    const handleReset = () =>{
        responses = []
        Title = ""
    }
</script>

<div class="flex flex-col  justify-center items-center h-screen text-black">
    <div>
        <button on:click={handleReset} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover: hover:text-white dark:text-white  "> <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Reset Form </span> </button>
    </div>
    <div class="flex justify-center my-2 gap-2 w-full">
        <button  on:click={() => handlePreset(codingSkillsForm2)} class="p-2  bg-blue-900/30 text-white text-xl font-semibold border-2 rounded-lg">Coding Interview</button>
        <button on:click={() => handlePreset(codingSkillsForm)}  class="p-2 text-white   bg-blue-900/30 text-xl font-semibold border-2 rounded-lg">Mock Interview Questions:</button>
        <button on:click={() => handlePreset(FeedBack)} class="p-2  bg-blue-900/30 text-xl text-white font-semibold border-2 rounded-lg">FeedBack Form</button>
        {#if $page.data.session?.user}
        <button on:click={handleDownloading} class="p-2 bg-blue-900/30 text-white text-xl font-semibold border-2 rounded-lg">
        Download Form
    </button>
{:else}
<button on:click={() => signIn("google")} class="p-2 text-xl text-white font-semibold border-2 rounded-lg">Login To Download</button>

{/if}

            </div>
    <div class="flex gap-2 text-white">

        {#if titleFocus == true}
            <button on:click={() =>handleAlignment("left")}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="3" y="5" width="18" height="2" fill="currentColor"/> <rect x="3" y="11" width="12" height="2" fill="currentColor"/> <rect x="3" y="17" width="18" height="2" fill="currentColor"/> </svg> </button>
            <button on:click={() => handleAlignment("center")}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="3" y="5" width="18" height="2" fill="currentColor"/> <rect x="6" y="11" width="12" height="2" fill="currentColor"/> <rect x="3" y="17" width="18" height="2" fill="currentColor"/> </svg> </button>
            <button on:click={() => handleAlignment("right")}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="3" y="5" width="18" height="2" fill="currentColor"/> <rect x="9" y="11" width="12" height="2" fill="currentColor"/> <rect x="3" y="17" width="18" height="2" fill="currentColor"/> </svg> </button>
        {/if}
    </div>
    <!-- <div bind:this={screenshot} class="paper bg-white rounded-lg shadow-lg p-6 overflow-auto flex-col justify-between"> -->
        <div bind:this={screenshot} class="paper bg-white rounded-lg shadow-lg p-6 overflow-hidden flex flex-col justify-between" style="width: 816px; height: 1056px;">

        <input bind:value={Title}  on:focus={() => titleFocus = true} on:blur={handleBlur}   class="w-full text-2xl p-2 mb-4 rounded-lg {alignment === 'right' ? 'text-right' : alignment === 'center' ? 'text-center' : 'text-left'}" placeholder="Title Here" />
        <div class="mb-4">
            <div class=" border-zinc-800 block rounded-lg  py-1 mb-4  ">
                <div class="flex ">
                    <div class="{downloaded ? 'hidden': ''}">

                        <input required bind:value={tempquestion}   class="p-1 rounded-lg" placeholder="Add Question" />
                        <button on:click={() => handleQuestions(tempquestion)} class="bg-blue-900 text-white rounded-md px-2 py-1 ml-2">[+]</button>
                    </div>
                    <div class="i items-center mx-4 {downloaded ? 'hidden': ''}">
                        

                            <label for="ratingcheck" class="mr-2">Add Rating</label>
                            <input bind:checked={tempRating} id="ratingcheck" type="checkbox" />
                        
                        <label for="ratingcheck" class="mr-2">Add Response</label>
                        <input bind:checked={addResponse} id="ratingcheck" type="checkbox" />
                        <label for="ratingcheck" class="mr-2">Add Comments</label>
                        <input bind:checked={addComments} id="ratingcheck" type="checkbox" />
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="block">
            {#each responses as item,index (item.id)}
            <div class="mb-4 relative">
                {#if item.focused}
                <button class="border-2 border-red-500 p-2 mx-4 z-40 animate-pulse 1s ease-in rounded-md  absolute right-[5%]" on:click={() =>handleDelete()} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash animate-none" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/> <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/> </svg>  </button>
            
                {/if}
                {#if item.question != undefined || item.rating != undefined}
                <input 
                    class="p-1 border rounded-lg w-full mb-2"
                    placeholder="Edit Question Here"
                    bind:value={item.question}
                    on:focus={() =>handleFocus(index,'question')}
                    on:blur={() => handleBlur(index)}
                />
            
                
                {/if}
                {#if item.comments != undefined}
                <textarea 
                class="p-1 border rounded-lg w-full {downloaded ? ' text' : ''}"
                placeholder="Add Comments Here"
                    bind:value={item.comments}
                    on:focus={() =>handleFocus(index,"comments")}
                    on:blur={() => handleBlur(index)}
                />
                {/if}
                {#if item.response != undefined}
                <input 
                    class="p-1 border rounded-lg w-full"
                    placeholder="Add Response Here"
                    bind:value={item.response}
                    on:focus={() =>handleFocus(index,"response")}
                    on:blur={() => handleBlur(index)}
                />
                {/if}
                {#if item.rating != undefined}

                {#each Array(10) as _, i}
                <label>
                    <input 
                        type="radio" 
                        name={`rating-${index}`} 
                        value={i + 1}
                        bind:group={responses[index].rating}
                        on:focus={() =>handleFocus(index,"rating")}
                        on:blur={() => handleBlur(index)}
                    />
                    {i + 1}
                </label>
            {/each}
                {/if}
            </div>
            {/each}

        </div>
        <div class="flex justify-center align-bottom bot">
            <div class="block">

                {#if signature}
                <p contenteditable="true" class="border-blue-500 rounded-md signature text-black" >
                    By {signatureText}
                </p>
                <button on:click={() => signature = false} class="remove-button {downloaded? 'hidden': ''}">
                    Remove
                </button>
                {:else}
                
                <button on:click={() => signature = true} class="toggle-button {downloaded ? "hidden": ""}">
                    Add Signature
                </button>
                
                {/if}
            </div>
    </div>
    <div  class="mt-auto text-right">

        <p class="t text-sm">Form Made By <a class="text-black" href="local">Form Response</a></p>
    </div>
    </div>
</div>


<style>
    textarea{
        resize:vertical;
        max-width:100%;
        border:none;
    }
    input{
        color:black;
        border:none; 
    }
    .paper{
        width:8.5in;
        height:11in;
        max-width: 100%;
        max-height:100%;
    }
    .signature{
        animation:pulse 8s forwards;
    }
    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
            border:none;
        }
    }
    </style>
