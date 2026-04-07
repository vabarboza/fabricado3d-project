<template>
  <section id="hero" class="hero">
    <div class="hero-bg"></div>
    <div class="container hero-content">
      <div class="hero-text">
        <div class="badge glass-panel">🔥 Impressão 3D FDM de Alta Qualidade</div>
        <h1 class="hero-title">Dê Vida às suas Ideias com <span>Precisão</span></h1>
        <p class="hero-desc">
          Desde protótipos mecânicos até action figures detalhados. Transformamos modelos digitais em realidade com a melhor tecnologia FDM do mercado.
        </p>
        <div class="hero-ctas">
          <a href="#catalog" class="btn btn-primary">Ver Catálogo</a>
          <a href="#quote" class="btn btn-outline">
            <MessageCircle class="icon-sm" /> Solicitar Orçamento
          </a>
        </div>
      </div>
      <div class="hero-image glass-panel">
        <img src="~/assets/images/mainImage.webp" alt="Impressora 3D em ação" class="hero-img-element" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { MessageCircle, Layers } from 'lucide-vue-next'
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 5rem; /* Account for navbar */
}

/* Abstract Tech Background */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 15% 50%, rgba(230, 92, 0, 0.08), transparent 40%),
              radial-gradient(circle at 85% 30%, rgba(0, 212, 255, 0.05), transparent 40%);
  z-index: -1;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.hero-title span {
  color: var(--primary);
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  max-width: 90%;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
}

.icon-sm {
  width: 18px;
  height: 18px;
}

.hero-image {
  aspect-ratio: 1;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--surface-color), var(--bg-color));
  position: relative;
  overflow: hidden;
}

.hero-img-element {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 12px;
}


@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-desc {
    margin: 0 auto 2rem;
  }
  
  .hero-ctas {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2.1rem;
  }
  .hero-desc {
    font-size: 0.95rem;
  }
  .hero-ctas {
    flex-direction: column;
  }
}
</style>
