<template>
  <section id="catalog" class="catalog-section">
    <div class="container">
      <h2 class="section-title">Nossos <span>Destaques</span></h2>
      <p class="section-subtitle">Conheça algumas das nossas peças mais populares em FDM</p>
      
      <div class="product-grid">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>

      <div class="catalog-action">
        <NuxtLink to="/catalogo" class="btn btn-outline btn-large">
          <Grid class="icon-sm" /> Ver Catálogo Completo
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Grid } from 'lucide-vue-next'
import { getProducts } from '~/utils/products'

// Mostre apenas os 6 primeiros produtos
const featuredProducts = computed(() => {
  return getProducts().slice(0, 6)
})
</script>

<style scoped>
.catalog-section {
  padding: 6rem 0;
  background-color: var(--surface-color);
}

.section-subtitle {
  text-align: center;
  color: var(--text-muted);
  margin-top: -2rem;
  margin-bottom: 4rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.catalog-action {
  display: flex;
  justify-content: center;
}

.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
}

.icon-sm {
  width: 18px;
  height: 18px;
}
</style>
