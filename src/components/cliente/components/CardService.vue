<template>
  <v-card
      :loading="loading"
      class="mx-auto my-4 animate__animated animate__rubberBand"
      max-width="300"
  >
    <template slot="progress">
      <v-progress-linear
          color="blue"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>

    <v-img
        :src="product.qrCode"
        height="150"
    ></v-img>

    <v-card-title class="text-h6">{{ product.name }}</v-card-title>

    <v-card-text>
      <div class="my-2 font-weight-black">
        Precio: ${{ product.price.toFixed(2) }}
      </div>
      <div class="my-2 text-caption">
        Proveedor: {{ product.supplier.name }}
      </div>
      <div class="my-2 text-caption">
        Categoría: {{ product.category.name }}
      </div>
      <div class="text-caption">
        {{ product.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-2"></v-divider>
    <v-btn
        color="deep-purple lighten-2"
        text
        @click="showElementos"
    >
      Ver elementos del paquete
    </v-btn>
    <v-card-actions>
      <v-btn
          color="deep-purple lighten-2"
          text
          @click="agregarProducto"
      >
        Agregar al carrito
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {useCartStore} from "@/stores/cart.store";

export default {
  data: () => ({
    loading: false,
    show: false,
    product: {},
  }),

  props: {
    product: {
      type: Object,
    }
  },

  methods: {
    async agregarProducto() {
      this.loading = true
      const cart = useCartStore();
      await cart.setProducto(this.product.uid);
      this.loading = false
    },
  },
}
</script>