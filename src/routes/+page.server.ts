import { writable } from 'svelte/store'

export const load = (async (events) => {
  const session = await events.locals.auth()
  
  // const form =  JSON.parse(localStorage.getItem('form'))
  // const response = writable(form,)
  return {
    session,
    // response
  }
})