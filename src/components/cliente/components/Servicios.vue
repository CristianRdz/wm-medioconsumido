<template>
  <div>
    <div class="flex justify-center items-center">
      <h1 class="text-2xl font-semibold text-gray-700">Servicios</h1>
    </div>
    <v-select
        :items="categories"
        v-model="selectedCategory"
        label="Selecciona una categoría"
        item-text="name"
        item-value="uid"
        return-object
        class="w-11/12 mx-auto text-lg"
    ></v-select>
    <div class="flex justify-center items-center">
      <v-btn
          v-if="selectedCategory"
          @click="selectedCategory = null"
          class="w-11/12 mx-auto bg-blue-900 text-white"
      >
        Limpiar filtro
      </v-btn>
    </div>
    <div class="card-container row">
      <v-progress-linear
          color="blue darken-2"
          height="5"
          indeterminate
          v-if="loading"
      ></v-progress-linear>
      <div class="card-item col-lg-3 col-md-4 col-sm-6 col-12 mb-4" v-for="(item, index) in paginatedServices" :key="index">
        <CardService :product="item"/>
      </div>
    </div>
    <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        @input="updatePagination"
        class="my-4 w-11/12 mx-auto"
    ></v-pagination>
  </div>
</template>

<script>
import CardService from "@/components/cliente/components/CardService.vue";
import { getProducts } from "@/services/ServicesServices";
import { getCategoriasServicios } from "@/services/CategoryServices";

export default {
  components: {
    CardService
  },
  data() {
    return {
      services: [],
      filteredServices: [],
      categories: [],
      selectedCategory: null,
      loading: false,
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedServices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredServices.slice(start, end);
    }
  },
  methods: {
    async fetchServices() {
      this.loading = true;
      const response = await getProducts();
      if (response) {
        this.services = response.data;
        this.filteredServices = this.services;
        this.totalPages = Math.ceil(this.filteredServices.length / this.itemsPerPage);
      } else {
        this.totalPages = 0;
        this.services = [];
        this.filteredServices = [];
        this.currentPage = 1;
      }
      this.loading = false;
    },
    async fetchCategories() {
      this.loading = true;
      const response = await getCategoriasServicios();
      if (response) {
        this.categories = response.data;
      }
      this.loading = false;
    },
    updatePagination() {
      this.totalPages = Math.ceil(this.filteredServices.length / this.itemsPerPage);
    },
    filterByCategory() {
      if (this.selectedCategory) {
        this.filteredServices = this.services.filter(service => service.category.uid === this.selectedCategory.uid);
      } else {
        this.filteredServices = this.services;
      }
      this.currentPage = 1;
      this.updatePagination();
    }
  },
  mounted() {
    this.fetchServices();
    this.fetchCategories();
  },
  watch: {
    selectedCategory() {
      this.filterByCategory();
    }
  }
}
</script>

<style scoped>
.card-container {
  margin-top: 20px;
}

.card-item {
  flex: 1 0 auto;
}
</style>