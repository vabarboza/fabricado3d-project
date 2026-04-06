<template>
  <div class="page-catalogo">
    <div class="container pt-6">
      <div class="page-header">
        <h1 class="section-title" style="margin-bottom: 1rem;">Catálogo <span>Completo</span></h1>
        <p class="section-subtitle">Navegue por todos os nossos modelos e peças em FDM</p>
      </div>

      <div class="filters glass-panel">
        <span class="filter-label">Filtrar por tipo:</span>
        <div class="filter-buttons">
          <button 
            class="filter-btn" 
            :class="{ active: selectedCategory === 'Todos' }"
            @click="selectedCategory = 'Todos'"
          >
            Todos
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat" 
            class="filter-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
      
      <div v-if="filteredProducts.length === 0" class="no-results">
        <p>Nenhum produto encontrado nesta categoria.</p>
      </div>

      <div class="product-grid">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getProducts } from '~/utils/products'

const products = getProducts()

// Get unique categories
const categories = computed(() => {
  const cats = products.map(p => p.category)
  return [...new Set(cats)].sort()
})

const selectedCategory = ref('Todos')

// Filter products
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'Todos') {
    return products
  }
  return products.filter(p => p.category === selectedCategory.value)
})
</script>

<style scoped>
.page-catalogo {
  min-height: calc(100vh - 300px); /* Adjust based on footer and nav approx heights */
  padding-bottom: 6rem;
}

.pt-6 {
  padding-top: 8rem; /* Account for navbar space */
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.filters {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-label {
  font-weight: 600;
  color: var(--text-muted);
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-main);
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background-color: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-muted);
  font-size: 1.1rem;
}
</style>
