<script lang="ts">
    import { goto } from '$app/navigation';
    import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
    import {auth} from "$lib/firebase";


    let email: string = '';
    let password: string = '';

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                onAuthStateChanged(auth, (user) => {if (user) {const uid = user.uid}});
                goto('/protected');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                console.log('authentication failed');
            });
    };
</script>

<style>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #4a90e2, #9059c8);
    }

    .login-form {
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 100%;
    }

    .input-field {
        width: 100%;
        padding: 12px 16px;
        margin-bottom: 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;
    }

    .login-button {
        width: 100%;
        padding: 12px;
        background-color: #4a90e2;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s ease;
        box-sizing: border-box;
    }

    .login-button:hover {
        background-color: #3d7fcc;
    }
</style>

<div class="login-container">
    <form class="login-form" on:submit|preventDefault={login}>
        <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>

        <input
                type="email"
                placeholder="Email"
                class="input-field"
                required
                bind:value={email}
        />
        <input
                type="password"
                placeholder="Password"
                class="input-field"
                required
                bind:value={password}
        />

        <button type="submit" class="login-button">Login</button>
    </form>
</div>
