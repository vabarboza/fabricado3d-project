<template>
  <section id="hero" class="hero">
    <!-- Enhanced animated background elements -->
    <div class="hero-bg">
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>
      <div class="ambient-orb orb-3"></div>
    </div>
    
    <div class="container hero-content">
      <div class="hero-text">
        <div class="badge glass-panel glow-hover">🔥 Impressão 3D FDM de Alta Qualidade</div>
        <h1 class="hero-title">Materialize o Impossível com <span>Perfeição 3D</span></h1>
        <p class="hero-desc">
          Do digital para suas mãos. Criamos peças exclusivas, action figures detalhados e protótipos mecânicos com a mais alta tecnologia de impressão FDM.
        </p>
        <div class="hero-ctas">
          <a href="#catalog" class="btn btn-primary btn-glow btn-lg">
            <Layers class="icon-sm" /> Explorar Catálogo
          </a>
          <a href="#quote" class="btn btn-outline btn-lg">
            <MessageCircle class="icon-sm" /> Solicitar Orçamento
          </a>
        </div>
        
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">+500</span>
            <span class="stat-label">Peças Impressas</span>
          </div>
          <div class="stat">
            <span class="stat-number">100%</span>
            <span class="stat-label">Satisfação</span>
          </div>
          <div class="stat">
            <span class="stat-number">BR</span>
            <span class="stat-label">Envio Nacional</span>
          </div>
        </div>
      </div>
      
      <div class="hero-image-wrapper">
        <div class="hero-mural">
          <div class="mural-item item-1 floating-slow">
            <img src="/images/04/LordOfRings.png" alt="Senhor dos Anéis" class="mural-img" />
          </div>
          <div class="mural-item item-2 floating-medium">
            <img src="/images/02/GatoGordo.png" alt="Gato Gordo" class="mural-img" />
          </div>
          <div class="mural-item item-3 floating-fast">
            <img src="/images/03/PokebolaChaveiro.png" alt="Pokébola" class="mural-img" />
          </div>
          <div class="mural-item item-4 floating-slow-delay">
            <img src="/images/05/SuporteHornetPS.png" alt="Suporte" class="mural-img" />
          </div>
          <div class="mural-item item-5 floating-medium-delay">
            <img src="/images/06/SenhorDourado.png" alt="Anéis Dourados" class="mural-img" />
          </div>
          
          <!-- Decorative 3D elements floating around -->
          <div class="floating-badge badge-1 glass-panel">⚙️ Alta Precisão</div>
          <div class="floating-badge badge-2 glass-panel">🎨 Cores Vibrantes</div>
        </div>
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
  padding-top: 5rem;
  overflow: hidden;
}

/* Enhanced Background */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 10s infinite ease-in-out alternate;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: var(--primary);
  top: -10%;
  left: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: #00d4ff;
  bottom: 10%;
  right: -5%;
  animation-delay: -5s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: #ff007f;
  top: 40%;
  left: 40%;
  opacity: 0.2;
  animation-delay: -2s;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.5rem;
  border: 1px solid rgba(230, 92, 0, 0.3);
  transition: all 0.3s ease;
}

.glow-hover:hover {
  box-shadow: 0 0 15px rgba(230, 92, 0, 0.4);
  transform: translateY(-2px);
}

.hero-title {
  font-size: 3.8rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.hero-title span {
  background: linear-gradient(135deg, var(--primary), #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hero-desc {
  font-size: 1.15rem;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  max-width: 95%;
  line-height: 1.6;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn-lg {
  padding: 0.8rem 1.5rem;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-glow {
  box-shadow: 0 0 20px rgba(230, 92, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.btn-glow::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
  transform: rotate(45deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.hero-stats {
  display: flex;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-main);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Image Mural Section */
.hero-image-wrapper {
  position: relative;
  width: 100%;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-mural {
  position: relative;
  width: 100%;
  height: 100%;
}

.mural-item {
  position: absolute;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(30, 36, 48, 0.7), rgba(20, 24, 32, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease;
}

.mural-item:hover {
  transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--rot, 0deg)) scale(1.08) translateY(-10px) !important;
  box-shadow: 0 25px 45px rgba(230, 92, 0, 0.4);
  z-index: 10 !important;
  border-color: rgba(230, 92, 0, 0.5);
  animation-play-state: paused;
}

.mural-img {
  width: 85%;
  height: 85%;
  object-fit: contain;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
}

/* Positions and Sizes */
.item-1 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  --tx: -50%;
  --ty: -50%;
  --rot: 0deg;
  transform: translate(-50%, -50%);
  z-index: 5;
  background: linear-gradient(135deg, rgba(230, 92, 0, 0.15), rgba(20, 24, 32, 0.95));
  border: 1px solid rgba(230, 92, 0, 0.4);
}

.item-2 {
  width: 180px;
  height: 180px;
  top: 5%;
  left: 5%;
  --tx: 0;
  --ty: 0;
  --rot: -8deg;
  transform: rotate(-8deg);
  z-index: 3;
}

.item-3 {
  width: 220px;
  height: 220px;
  bottom: 10%;
  right: 0%;
  --tx: 0;
  --ty: 0;
  --rot: 6deg;
  transform: rotate(6deg);
  z-index: 6;
}

.item-4 {
  width: 160px;
  height: 160px;
  top: 10%;
  right: 5%;
  --tx: 0;
  --ty: 0;
  --rot: 12deg;
  transform: rotate(12deg);
  z-index: 2;
}

.item-5 {
  width: 190px;
  height: 190px;
  bottom: 5%;
  left: 10%;
  --tx: 0;
  --ty: 0;
  --rot: -5deg;
  transform: rotate(-5deg);
  z-index: 4;
}

/* Animations */
.floating-slow { animation: float-mural 7s infinite ease-in-out; }
.floating-medium { animation: float-mural 5s infinite ease-in-out 1s; }
.floating-fast { animation: float-mural 4s infinite ease-in-out 2s; }
.floating-slow-delay { animation: float-mural 6s infinite ease-in-out 3s; }
.floating-medium-delay { animation: float-mural 5.5s infinite ease-in-out 1.5s; }

@keyframes float-mural {
  0% { transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--rot, 0deg)) translateY(0); }
  50% { transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--rot, 0deg)) translateY(-15px); }
  100% { transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--rot, 0deg)) translateY(0); }
}

.floating-badge {
  position: absolute;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 3;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(20, 24, 32, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.badge-1 {
  top: 0%;
  right: -10%;
  animation: float 5s infinite ease-in-out 1s;
}

.badge-2 {
  bottom: 0%;
  left: -10%;
  animation: float 7s infinite ease-in-out 2s;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}

@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  
  .hero-desc {
    margin: 0 auto 2.5rem;
  }
  
  .hero-ctas {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-image-wrapper {
    height: 450px;
    transform: scale(0.9);
  }
  
  .badge-1 { right: 5%; top: 10%; }
  .badge-2 { left: 5%; bottom: 10%; }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-desc {
    font-size: 1rem;
  }
  .hero-ctas {
    flex-direction: column;
  }
  .hero-stats {
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }
  .hero-image-wrapper {
    height: 350px;
    transform: scale(0.7);
    margin-top: -30px;
  }
}
</style>
