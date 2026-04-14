<template>
  <div class="product-card glass-panel">
    
    <div class="product-image-container relative">
      <!-- Carousel Arrows -->
      <button v-if="imagesArray.length > 1" @click="prevImage" class="carousel-btn left-btn">
        <ChevronLeft class="caret-icon" />
      </button>

      <div class="image-wrapper">
        <!-- If there is a real image -->
        <img v-if="currentImage" :src="currentImage" :alt="product.name" class="real-product-image" />
        
        <!-- Placeholder if no image is set -->
        <div v-else class="placeholder-graphic">
          <Box class="icon-md" />
          <span>Imagem {{ currentImageIndex + 1 }} - {{ product.name }}</span>
        </div>
      </div>

      <button v-if="imagesArray.length > 1" @click="nextImage" class="carousel-btn right-btn">
        <ChevronRight class="caret-icon" />
      </button>

      <!-- Carousel Indicators -->
      <div v-if="imagesArray.length > 1" class="carousel-indicators">
        <span 
          v-for="(img, idx) in imagesArray" 
          :key="idx" 
          class="dot"
          :class="{ active: idx === currentImageIndex }"
        ></span>
      </div>
    </div>

    <div class="product-info">
      <div class="category-row">
        <span class="category">{{ product.category }}</span>
      </div>
      <NuxtLink :to="`/produto/${product.id}`" class="product-title-link">
        <h3>{{ product.name }}</h3>
      </NuxtLink>
      
      <p class="description">{{ product.description }}</p>
      
      <div class="dimensions" v-if="product.dimensions">
        <Ruler class="icon-xs" />
        <span>{{ product.dimensions }}</span>
      </div>

      <div class="product-footer">
        <span class="price">{{ product.price }}</span>
        <div class="actions">
          <a :href="wppLink" target="_blank" class="btn btn-outline btn-sm btn-icon" title="Tirar dúvidas no WhatsApp" rel="noopener noreferrer" @click="trackWhatsAppClick">
            <MessageCircle class="icon-sm" /> WhatsApp
          </a>
          <a v-if="product.externalBuyLink" :href="product.externalBuyLink" target="_blank" class="btn btn-primary btn-sm btn-icon" title="Comprar produto" @click="trackBuyClick">
            <ShoppingCart class="icon-sm" /> Comprar
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Box, ShoppingCart, Ruler, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-vue-next'
import { track } from '@vercel/analytics'
import { getWppLink } from '~/utils/products'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Ensure there is always a fallback array if not defined
const imagesArray = computed(() => {
  return props.product.images && props.product.images.length > 0 
    ? props.product.images 
    : [null, null, null]
})

const currentImageIndex = ref(0)
const currentImage = computed(() => imagesArray.value[currentImageIndex.value])

const prevImage = () => {
  if (currentImageIndex.value === 0) {
    currentImageIndex.value = imagesArray.value.length - 1
  } else {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (currentImageIndex.value === imagesArray.value.length - 1) {
    currentImageIndex.value = 0
  } else {
    currentImageIndex.value++
  }
}

const wppLink = computed(() => getWppLink(props.product.name))

const trackWhatsAppClick = () => {
  track('click_whatsapp', { product_name: props.product.name })
}

const trackBuyClick = () => {
  track('click_comprar', { product_name: props.product.name })
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: var(--surface-color-light);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border-color: rgba(230, 92, 0, 0.3);
}

.product-image-container {
  aspect-ratio: 4/3;
  background-color: var(--bg-color);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--glass-border);
}

/* Image Wrappers */
.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.real-product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-graphic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.icon-md {
  width: 32px;
  height: 32px;
}

/* Carousel Buttons */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(20, 24, 32, 0.6);
  border: none;
  color: #fff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s ease;
}

.carousel-btn:hover {
  background: var(--primary);
}

.left-btn {
  left: 0.5rem;
}

.right-btn {
  right: 0.5rem;
}

.caret-icon {
  width: 20px;
  height: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: background 0.3s ease;
}

.dot.active {
  background: var(--primary);
}


/* Product Info */
.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.category-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.category {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--secondary);
}

.product-info h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.description {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.dimensions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--primary);
  opacity: 0.9;
  background: rgba(230, 92, 0, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  width: fit-content;
  margin-bottom: 1.5rem;
}

.icon-xs {
  width: 14px;
  height: 14px;
}

.product-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
  margin-top: auto;
}

.price {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-main);
}

.actions {
  display: flex;
  width: 100%;
  gap: 0.5rem;
}

.actions .btn {
  flex: 1;
  justify-content: center;
  padding: 0.6rem 0.5rem;
  font-size: 0.85rem;
  white-space: nowrap;
}

.btn-icon {
  gap: 0.4rem;
}

.btn-sm {
  padding: 0.5rem 0.85rem;
  font-size: 0.9rem;
}

.product-title-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.product-title-link:hover h3 {
  color: var(--primary);
}

.product-info h3 {
  font-size: 1.25rem;
  margin: 0;
}
</style>
