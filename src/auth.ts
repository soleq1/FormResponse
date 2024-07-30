import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET } from "$env/static/private"
import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"

const googleClientId = AUTH_GOOGLE_ID;
const googleClientSecret = AUTH_GOOGLE_SECRET;
const googleAuthSecret = AUTH_SECRET
export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
  const authOptions = {
    providers: [
      Google({
        clientId: googleClientId,
        clientSecret: googleClientSecret
      })
    ],
    secret: googleAuthSecret,
    trustHost: true
  }
  return authOptions
})