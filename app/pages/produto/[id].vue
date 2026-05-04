<template>
  <div class="product-detail-page section-container">
    <div v-if="product" class="glass-panel product-container">
      <NuxtLink to="/catalogo" class="back-link">
        <ArrowLeft class="icon-sm" /> Voltar ao Catálogo
      </NuxtLink>
      
      <div class="product-content">
        <!-- Gallery -->
        <div class="product-gallery">
          <div class="main-image">
            <img v-if="currentImage" :src="currentImage" :alt="product.name" class="real-image" />
            <div v-else class="placeholder-main">
              <Box class="icon-xl" />
              <span>Imagem {{ currentImageIndex + 1 }}</span>
            </div>
          </div>
          <div class="thumbnails" v-if="imagesArray.length > 1">
            <div 
              v-for="(img, idx) in imagesArray" 
              :key="idx" 
              class="thumbnail"
              :class="{ active: idx === currentImageIndex }"
              @click="currentImageIndex = idx"
            >
              <img v-if="img" :src="img" :alt="product.name + ' - ' + (idx + 1)" class="real-thumb" />
              <div v-else class="placeholder-thumb">
                <Box class="icon-sm" />
                <span>{{ idx + 1 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Details -->
        <div class="product-details">
          <span class="category">{{ product.category }}</span>
          <h1>{{ product.name }}</h1>
          <p class="price">{{ product.price }}</p>
          
          <div class="description-box">
            <h4>Descrição</h4>
            <p>{{ product.description }}</p>
          </div>
          
          <div class="specs-box" v-if="product.dimensions">
            <h4>Especificações</h4>
            <div class="spec-item">
              <Ruler class="icon-sm" />
              <span><strong>Dimensões:</strong> {{ product.dimensions }}</span>
            </div>
          </div>

          <div class="actions">
            <a :href="wppLink" target="_blank" class="btn btn-primary btn-icon" title="Tirar dúvidas no WhatsApp" rel="noopener noreferrer">
              <MessageCircle class="icon-sm" /> Comprar via WhatsApp
            </a>
            <a v-if="product.externalBuyLink" :href="product.externalBuyLink" target="_blank" class="btn btn-outline btn-icon" title="Comprar produto externamente">
              <ShoppingCart class="icon-sm" /> Link Externo
            </a>
            <a href="mailto:contato@fabricado3d.com.br" class="btn btn-outline btn-icon" title="Dúvidas por e-mail">
              <Mail class="icon-sm" /> Dúvidas por E-mail
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="not-found">
      <h2>Produto não encontrado</h2>
      <NuxtLink to="/catalogo" class="btn btn-primary">Voltar ao Catálogo</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useHead, useSeoMeta } from '#imports'
import { ArrowLeft, Box, ShoppingCart, Ruler, MessageCircle, Mail } from 'lucide-vue-next'
import { getProducts, getWppLink } from '~/utils/products'

const route = useRoute()
// The ID from the route.
const productId = Number(route.params.id)

const products = getProducts()
const product = computed(() => products.find(p => p.id === productId))

const imagesArray = computed(() => {
  if (!product.value) return []
  return product.value.images && product.value.images.length > 0 
    ? product.value.images 
    : [null, null, null]
})

const currentImageIndex = ref(0)
const currentImage = computed(() => imagesArray.value[currentImageIndex.value])

const wppLink = computed(() => {
  if (!product.value) return ''
  return getWppLink(product.value.name)
})

// SEO
watchEffect(() => {
  if (product.value) {
    const title = `${product.value.name} | Fábrica do 3D`
    const description = product.value.description
    const image = product.value.images && product.value.images[0] ? product.value.images[0] : '/og-image.png'

    useSeoMeta({
      title,
      ogTitle: title,
      description,
      ogDescription: description,
      ogImage: image,
      twitterCard: 'summary_large_image',
    })

    useHead({
      title
    })
  }
})
</script>

<style scoped>
.product-detail-page {
  padding-top: 6rem;
  padding-bottom: 4rem;
  min-height: 80vh;
}

.product-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--primary);
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
  }
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  background-color: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--glass-border);
}

.real-image {
  max-width: 100%;
  height: auto;
  display: block;
}

.placeholder-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-muted);
}

.icon-xl {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
}

.thumbnails {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnail {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  overflow: hidden;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}

.thumbnail.active {
  border-color: var(--primary);
}

.real-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-thumb {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.7rem;
}

.product-details {
  display: flex;
  flex-direction: column;
}

.category {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

.product-details h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-main);
  line-height: 1.1;
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 2rem;
}

.description-box, .specs-box {
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
}

.description-box h4, .specs-box h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: var(--text-main);
}

.description-box p {
  color: var(--text-muted);
  line-height: 1.6;
  white-space: pre-line;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
}

.actions .btn {
  width: 100%;
  justify-content: center;
  font-size: 1.1rem;
  padding: 1rem;
}

.not-found {
  text-align: center;
  padding: 4rem;
}
</style>
