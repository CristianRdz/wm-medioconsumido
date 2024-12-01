import {defineStore} from 'pinia';
import {showNotification} from "@/utils/notification";
import {fetchClient} from "@/utils/fetch-client";
import router from "@/router";

const baseUrl = `/auth`;

export const useAuthStore = defineStore({
    id: 'auth', state: () => ({
        user: JSON.parse(localStorage.getItem('user')), returnUrl: null,

    }), actions: {
        async login(email, password) {
            try {
                const userInfo = await fetchClient.post(`${baseUrl}/`, {email, password});
                userInfo.data ? showNotification('success', 'Bienvenido') : showNotification('error', 'Usuario o contraseña incorrectos');
                this.user = userInfo.data;
                localStorage.setItem('user', JSON.stringify(userInfo.data));
                let route = ' /home/inicio';
                this.returnUrl = route;
                await router.push(route);
            } catch (e) {
                console.error(e);
                showNotification('error', 'Usuario o contraseña incorrectos');
            }
        }, logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/home/inicio');
            showNotification('success', 'Sesión cerrada');

        }
    }
});

//
