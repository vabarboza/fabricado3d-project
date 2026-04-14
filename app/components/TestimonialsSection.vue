<template>
  <section id="testimonials" class="testimonials-section section-container">
    <div class="header-content text-center">
      <h2>O Que Dizem Nossos <span class="highlight">Clientes</span></h2>
      <p class="subtitle">Confira a opinião de quem já comprou com a Fábrica do 3D</p>
    </div>

    <div class="carousel-container relative">
      <!-- Controls -->
      <button class="carousel-btn prev-btn" @click="prevSlide" aria-label="Anterior">
        <ChevronLeft class="icon-md" />
      </button>

      <div class="carousel-track" ref="track">
        <transition name="fade" mode="out-in">
          <div :key="currentIndex" class="testimonial-card glass-panel">
            <div class="quote-icon">
              <Quote class="icon-lg" />
            </div>
            
            <div class="stars">
              <Star v-for="i in 5" :key="i" class="star" :class="{ filled: i <= currentTestimonial.rating }" />
            </div>

            <p class="testimonial-text">"{{ currentTestimonial.text }}"</p>
            
            <div class="author-info">
              <div class="avatar-placeholder">
                <User class="icon-sm" />
              </div>
              <div class="author-details">
                <h4 class="author-name">{{ currentTestimonial.name }}</h4>
                <span class="author-role">{{ currentTestimonial.role }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <button class="carousel-btn next-btn" @click="nextSlide" aria-label="Próximo">
        <ChevronRight class="icon-md" />
      </button>

      <div class="indicators">
        <button 
          v-for="(t, idx) in testimonials" 
          :key="idx"
          class="indicator-dot"
          :class="{ active: currentIndex === idx }"
          @click="goToSlide(idx)"
          :aria-label="'Ver depoimento ' + (idx + 1)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Quote, Star, User } from 'lucide-vue-next'

const testimonials = [
  {
    id: 1,
    name: "Carlos Almeida",
    role: "Comprador Verificado",
    text: "Comprei o Suporte Articulado e a qualidade me surpreendeu! Peça super resistente, acabamento impecável. A entrega foi super rápida e o atendimento nota 10.",
    rating: 5
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Cliente VIP",
    text: "O Busto do Dragão é simplesmente espetacular. Cheio de detalhes, muito bem feito. Deu outra cara para minha estante. Com certeza comprarei mais estatuetas!",
    rating: 5
  },
  {
    id: 3,
    name: "Fernando Silva",
    role: "Comprador Verificado",
    text: "Encomendei chaveiros personalizados para minha empresa e o resultado superou as expectativas. As duas cores ficaram perfeitas. Recomendo de olhos fechados.",
    rating: 4
  },
  {
    id: 4,
    name: "Beatriz Nogueira",
    role: "Comprador Verificado",
    text: "A Luminária da Lua é linda, a textura fica incrível à noite quando ligada. Muito bem embalado e chegou em perfeito estado.",
    rating: 5
  }
]

const currentIndex = ref(0)
const currentTestimonial = computed(() => testimonials[currentIndex.value])

let autoplayInterval

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
  resetAutoplay()
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? testimonials.length - 1 : currentIndex.value - 1
  resetAutoplay()
}

const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoplay()
}

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.length
  }, 5000)
}

const resetAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
})
</script>

<style scoped>
.testimonials-section {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.header-content {
  margin-bottom: 4rem;
  text-align: center;
}

.highlight {
  color: var(--primary);
}

.carousel-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-track {
  width: 100%;
  padding: 1rem 4rem;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.testimonial-card {
  width: 100%;
  padding: 3.5rem 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.quote-icon {
  position: absolute;
  top: -24px;
  background: var(--bg-color);
  padding: 0.8rem;
  border-radius: 50%;
  color: var(--primary);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stars {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 1.5rem;
}

.star {
  width: 22px;
  height: 22px;
  color: rgba(255, 255, 255, 0.2);
}

.star.filled {
  color: #ffc107;
  fill: #ffc107;
}

.testimonial-text {
  font-size: 1.2rem;
  line-height: 1.6;
  font-style: italic;
  color: var(--text-main);
  margin-bottom: 2rem;
  opacity: 0.9;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--surface-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.author-details {
  text-align: left;
}

.author-name {
  font-size: 1.1rem;
  margin: 0;
  color: var(--text-main);
  font-weight: 600;
}

.author-role {
  font-size: 0.85rem;
  color: var(--primary);
}

/* Controls */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(20, 24, 32, 0.6);
  border: 1px solid var(--glass-border);
  color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.carousel-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 15px rgba(230, 92, 0, 0.4);
}

.prev-btn { left: 0; }
.next-btn { right: 0; }

.indicators {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator-dot.active {
  background: var(--primary);
  transform: scale(1.4);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 768px) {
  .carousel-track { padding: 1rem 0; min-height: 320px; }
  .carousel-btn { display: none; }
  .testimonial-card { padding: 3rem 1.5rem 2rem; margin: 0 1rem; width: auto; }
  .testimonial-text { font-size: 1.05rem; }
  .header-content h2 { font-size: 2rem; }
}
</style>
