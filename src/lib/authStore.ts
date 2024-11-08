import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; 

type AuthUser = {
    uid: string;
    email: string | null;
} | null;


export const authUser = writable<AuthUser>(null);

onAuthStateChanged(auth, (user) => {
    if (user) {
        authUser.set({
            uid: user.uid,
            email: user.email
        });
    } else {
        authUser.set(null);
    }
});
