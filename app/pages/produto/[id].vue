<template>
  <div class="product-detail-page section-container">
    <div v-if="product" class="glass-panel product-container">
      <NuxtLink to="/catalogo" class="back-link">
        <ArrowLeft class="icon-sm" /> Voltar ao Catálogo
      </NuxtLink>
      
      <div class="product-content">
        <!-- Gallery -->
        <div class="product-gallery">
          <div class="main-image overflow-hidden">
            <img v-if="currentImage" :src="currentImage" :alt="product.name" class="real-image" @click="openLightbox" />
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

  <!-- Lightbox Modal -->
  <Teleport to="body">
    <div v-if="isLightboxOpen" class="lightbox-overlay" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">
        <X class="icon-lg" />
      </button>
      
      <div class="lightbox-content" @click.stop>
        <button v-if="imagesArray.length > 1" @click.stop="prevLightboxImage" class="lightbox-btn left-btn">
          <ChevronLeft class="icon-lg" />
        </button>
        
        <img :src="imagesArray[lightboxIndex]" :alt="product?.name" class="lightbox-img" :key="lightboxIndex" />
        
        <button v-if="imagesArray.length > 1" @click.stop="nextLightboxImage" class="lightbox-btn right-btn">
          <ChevronRight class="icon-lg" />
        </button>
        
        <!-- Indicators -->
        <div v-if="imagesArray.length > 1" class="lightbox-indicators">
          <span 
            v-for="(img, idx) in imagesArray" 
            :key="'lb-'+idx" 
            class="dot"
            :class="{ active: idx === lightboxIndex }"
            @click="lightboxIndex = idx"
          ></span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watchEffect, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead, useSeoMeta } from '#imports'
import { ArrowLeft, Box, ShoppingCart, Ruler, MessageCircle, Mail, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
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

// Lightbox Logic
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = () => {
  lightboxIndex.value = currentImageIndex.value
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden' // prevent scrolling
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = '' // restore scrolling
}

const prevLightboxImage = () => {
  if (lightboxIndex.value === 0) {
    lightboxIndex.value = imagesArray.value.length - 1
  } else {
    lightboxIndex.value--
  }
}

const nextLightboxImage = () => {
  if (lightboxIndex.value === imagesArray.value.length - 1) {
    lightboxIndex.value = 0
  } else {
    lightboxIndex.value++
  }
}

onUnmounted(() => {
  if (isLightboxOpen.value) {
    document.body.style.overflow = ''
  }
})

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
  cursor: pointer;
  transition: transform 0.4s ease;
}

.real-image:hover {
  transform: scale(1.05);
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

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 15, 20, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(20, 24, 32, 0.5);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  z-index: 10000;
  padding: 10px;
  transition: color 0.2s ease, transform 0.2s ease, background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close:hover {
  color: var(--primary);
  background: rgba(20, 24, 32, 0.9);
  transform: scale(1.1);
}

.icon-lg {
  width: 28px;
  height: 28px;
}

.lightbox-content {
  position: relative;
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 10px 50px rgba(0,0,0,0.6);
  animation: fadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.lightbox-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(20, 24, 32, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10000;
  transition: background 0.3s ease, transform 0.3s ease;
  backdrop-filter: blur(5px);
}

.lightbox-btn:hover {
  background: var(--primary);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-btn.left-btn {
  left: -20px;
}

.lightbox-btn.right-btn {
  right: -20px;
}

.lightbox-indicators {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.lightbox-indicators .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: background 0.3s ease;
  cursor: pointer;
}

.lightbox-indicators .dot.active {
  background: var(--primary);
}

.lightbox-indicators .dot:hover {
  background: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .lightbox-btn {
    width: 40px;
    height: 40px;
  }
  .lightbox-btn.left-btn { left: 0px; }
  .lightbox-btn.right-btn { right: 0px; }
  .lightbox-content { height: 70vh; }
}
</style>
