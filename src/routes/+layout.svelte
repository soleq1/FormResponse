<script>
  import Footer from '$lib/components/footer.svelte';
import Header from '$lib/components/header.svelte';

  import { inject } from '@vercel/analytics'
    import '../app.css'
    inject()
</script>

<Header />
<slot />

<Footer/>
