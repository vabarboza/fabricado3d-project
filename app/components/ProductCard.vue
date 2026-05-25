<template>
  <div class="product-card glass-panel">
    
    <div class="product-image-container relative">
      <!-- Carousel Arrows -->
      <button v-if="imagesArray.length > 1" @click="prevImage" class="carousel-btn left-btn">
        <ChevronLeft class="caret-icon" />
      </button>

      <div class="image-wrapper overflow-hidden">
        <!-- If there is a real image -->
        <img v-if="currentImage" :src="currentImage" :alt="product.name" class="real-product-image" @click="openLightbox" />
        
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
      
      <p class="description">
        {{ truncatedDescription }}
        <NuxtLink v-if="isTruncated" :to="`/produto/${product.id}`" class="see-more-link">ver mais...</NuxtLink>
      </p>
      
      <div class="dimensions" v-if="product.dimensions">
        <Ruler class="icon-xs" />
        <span>{{ product.dimensions }}</span>
      </div>

      <div class="product-footer">
        <span class="price">{{ product.price }}</span>
        <div class="actions">
          <div class="buy-buttons">
            <a v-if="product.externalBuyLink" :href="product.externalBuyLink" target="_blank" class="btn btn-shopee btn-sm btn-icon" title="Comprar na Shopee" rel="noopener noreferrer" @click="trackShopeeClick">
              <ShoppingBag class="icon-sm" /> Shopee
            </a>
            <a v-if="product.mercadoLivreLink" :href="product.mercadoLivreLink" target="_blank" class="btn btn-ml btn-sm btn-icon" title="Comprar no Mercado Livre" rel="noopener noreferrer" @click="trackMLClick">
              <Store class="icon-sm" /> Mercado Livre
            </a>
          </div>
          <a :href="wppLink" target="_blank" class="btn btn-outline btn-sm btn-icon wpp-btn" title="Tirar dúvidas no WhatsApp" rel="noopener noreferrer" @click="trackWhatsAppClick">
            <MessageCircle class="icon-sm" /> WhatsApp
          </a>
        </div>
      </div>
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
        
        <img :src="imagesArray[lightboxIndex]" :alt="product.name" class="lightbox-img" :key="lightboxIndex" />
        
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
import { ref, computed, onUnmounted } from 'vue'
import { Box, ShoppingCart, Ruler, ChevronLeft, ChevronRight, MessageCircle, X, ShoppingBag, Store } from 'lucide-vue-next'
import { track } from '@vercel/analytics'
import { getWppLink } from '~/utils/products'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const truncatedDescription = computed(() => {
  const maxLength = 110
  if (props.product.description && props.product.description.length > maxLength) {
    return props.product.description.substring(0, maxLength).trim() + '...'
  }
  return props.product.description
})

const isTruncated = computed(() => {
  const maxLength = 110
  return props.product.description && props.product.description.length > maxLength
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

const wppLink = computed(() => getWppLink(props.product.name))

const trackWhatsAppClick = () => {
  track('click_whatsapp', { product_name: props.product.name })
}

const trackShopeeClick = () => {
  track('click_shopee', { product_name: props.product.name })
}

const trackMLClick = () => {
  track('click_mercadolivre', { product_name: props.product.name })
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
  cursor: pointer;
  transition: transform 0.4s ease;
}

.real-product-image:hover {
  transform: scale(1.08);
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

.see-more-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  white-space: nowrap;
  margin-left: 0.2rem;
}

.see-more-link:hover {
  text-decoration: underline;
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
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

.buy-buttons {
  display: flex;
  width: 100%;
  gap: 0.5rem;
}

.actions .btn,
.buy-buttons .btn {
  justify-content: center;
  padding: 0.6rem 0.5rem;
  font-size: 0.85rem;
  white-space: nowrap;
  border-radius: 8px;
}

.actions .wpp-btn {
  width: 100%;
  border-color: rgba(37, 211, 102, 0.3);
  color: #25d366;
}

.actions .wpp-btn:hover {
  background-color: rgba(37, 211, 102, 0.1);
  border-color: #25d366;
  color: #25d366;
  transform: translateY(-2px);
}

.btn-shopee {
  background-color: #ee4d2d;
  color: #fff;
  flex: 1;
  box-shadow: 0 4px 12px rgba(238, 77, 45, 0.3);
}

.btn-shopee:hover {
  background-color: #ff5a38;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(238, 77, 45, 0.5);
}

.btn-ml {
  background-color: #fff159;
  color: #2d3238;
  flex: 1;
  box-shadow: 0 4px 12px rgba(255, 241, 89, 0.2);
}

.btn-ml:hover {
  background-color: #ffe033;
  color: #111111;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 241, 89, 0.4);
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
  cursor: pointer;
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
