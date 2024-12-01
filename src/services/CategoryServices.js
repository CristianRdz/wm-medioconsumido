import { fetchClient } from "@/utils/fetch-client";
import { showNotification } from "@/utils/notification";

const getCategoriasServicios = async () => {
    try {
        const response = await fetchClient.get(`/categories/`);
        return response.data;
    } catch (error) {
        showNotification("error", "Error al obtener categorías de servicios");
    }
};

export {
    getCategoriasServicios,
    // other exports...
};