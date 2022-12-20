<script lang="ts">
    import { supabaseClient } from '$lib/supabaseClient'

    let loading = false
    let email: string
    let password: string

    const handleLogin = async () => {
        try {
            loading = true
            const { error } = await supabaseClient.auth.signInWithPassword({ email, password })
            if (error) throw error
            alert('Sign in Success!')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }

    const handleRegister = async () => {
        try {
            loading = true
            const { error } = await supabaseClient.auth.signUp({ email, password })
            if (error) throw error
            alert('Sign Up Success!')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }

    let data = supabaseClient.auth.getUser()
</script>


<p>{data}</p>
<form class="row flex-center flex" on:submit|preventDefault={handleLogin}>
    <div class="col-6 form-widget">
        <p class="description">Login</p>
        <div>
            <input class="inputField" type="email" placeholder="Your email" bind:value={email} />
        </div>
        <div>
            <input class="inputField" type="password" placeholder="Password" bind:value={password} />
        </div>
        <div>
            <input
                    type="submit"
                    class="button block"
                    value={loading ? 'Loading' : 'Login'}
                    disabled={loading}
            />
        </div>
    </div>
</form>

<form class="row flex-center flex" on:submit|preventDefault={handleRegister}>
    <div class="col-6 form-widget">
        <p class="description">Login</p>
        <div>
            <input class="inputField" type="email" placeholder="Your email" bind:value={email} />
        </div>
        <div>
            <input class="inputField" type="password" placeholder="Password" bind:value={password} />
        </div>
        <div>
            <input
                    type="submit"
                    class="button block"
                    value={loading ? 'Loading' : 'Login'}
                    disabled={loading}
            />
        </div>
    </div>
</form>