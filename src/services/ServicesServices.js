import {fetchClient} from "@/utils/fetch-client";
import {showNotification} from "@/utils/notification";

const getProducts = async () => {
    try {
        const response = await fetchClient.get("/products/");
        return response;
    } catch (error) {
        showNotification("error", "Error al obtener productos");
    }
};

const getProductById = async (id) => {
    try {
        const response = await fetchClient.get(`/products/${id}`);
        return response;
    } catch (error) {
        showNotification("error", "Error al obtener producto por ID");
    }
};

const updateProduct = async (product) => {
    try {
        const response = await fetchClient.put("/products/", product);
        response ? showNotification("success", "Producto actualizado") : showNotification("error", "Error al actualizar producto");
        return response;
    } catch (error) {
        showNotification("error", "Error al actualizar producto");
    }
};

const createProduct = async (product) => {
    try {
        const response = await fetchClient.post("/products/", product);
        response ? showNotification("success", "Producto creado") : showNotification("error", "Error al crear producto");
        return response;
    } catch (error) {
        showNotification("error", "Error al crear producto");
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await fetchClient.delete(`/products/${id}`);
        !response ? showNotification("success", "Producto eliminado") : showNotification("error", "Error al eliminar producto");
        return response;
    } catch (error) {
        showNotification("error", "Error al eliminar producto");
    }
};

// Exportamos todas las funciones
export {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct,
};