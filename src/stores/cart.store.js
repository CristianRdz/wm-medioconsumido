import {defineStore} from 'pinia';
import {showNotification} from "@/utils/notification";

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: JSON.parse(localStorage.getItem('cart')) || { products: [], status: 'EXIT' },
        idPaquete: localStorage.getItem('idPaquete') || ''
    }),
    actions: {
        addStuff(nuevoProducto) {
            this.cart.products = [...this.cart.products, { product: { uid: nuevoProducto.uid }, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(this.cart));
            showNotification('success', 'Producto añadido correctamente');
        },
        substractStuff(uid) {
            this.cart.products = this.cart.products.filter((item) => item.product.uid !== uid);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            showNotification('success', 'Producto sustraido correctamente');
        },
        isInCart(uid) {
            return this.cart.products.some(item => item.product.uid === uid);
        },
        getTotal() {
            return this.cart.products.reduce((suma, item) => {
                return suma + (item.product.price * item.quantity);
            }, 0);
        },
        deleteAll() {
            this.cart = { products: [], status: 'EXIT' };
            this.idPaquete = '';
            localStorage.removeItem('idPaquete');
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
    }
});

// {
//   "products": [
//     {
//       "product": {
//         "uid": "string"
//       },
//       "quantity": 0
//     }
//   ],
//   "status": "EXIT"
// }