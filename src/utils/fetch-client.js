import { useAuthStore } from '@/stores/auth.store';
import { API_URL } from '@/utils/constants';
import { showNotification } from '@/utils/notification';

export const fetchClient = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return async (url, body) => {
        const headers = authHeader(url);
        if (body) {
            headers['Content-Type'] = 'application/json';
        }
        try {
            const response = await fetch(`${API_URL}${url}`, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined
            });
            return handleResponse(response);
        } catch (error) {
            throw error;
        }
    }
}

function authHeader(url) {
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        const { user } = useAuthStore();
        if ([401].includes(response.status) && user) {
            showNotification('error', 'Recurso mal solicitado o no autorizado');
        }
        const error = data?.message || response.statusText;
        return Promise.reject(error);
    }
    return data;
}