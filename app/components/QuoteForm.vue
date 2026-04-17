<template>
  <section id="quote" class="quote-section">
    <div class="container">
      <div class="quote-wrapper glass-panel">
        <div class="quote-content">
          <h2 class="section-title" style="text-align: left; margin-bottom: 1rem;">Orçamento <span>Personalizado</span></h2>
          <p class="quote-desc">
            Tem um arquivo 3D (STL, OBJ) ou uma ideia de projeto? Nós imprimimos para você com a melhor qualidade e resistência em FDM.
          </p>
          <ul class="quote-benefits">
            <li><CheckCircle class="benefit-icon" /> Análise gratuita do seu arquivo 3D</li>
            <li><CheckCircle class="benefit-icon" /> Escolha de material (PLA, PETG, ABS)</li>
            <li><CheckCircle class="benefit-icon" /> Opções de resolução e preenchimento</li>
            <li><CheckCircle class="benefit-icon" /> Orçamento rápido via WhatsApp</li>
          </ul>
        </div>
        
        <div class="quote-action">
          <div class="action-card">
            <h3>Fale com um Especialista</h3>
            <p>Envie sua ideia ou arquivo diretamente pelo WhatsApp para receber seu orçamento em instantes.</p>
            <a :href="wppQuoteLink" target="_blank" class="btn btn-primary btn-large">
              <MessageCircle class="icon-md" /> Solicitar pelo WhatsApp
            </a>
            <a href="mailto:contato@fabricado3d.com.br" class="btn btn-outline btn-large">
              <Mail class="icon-md" /> Enviar por E-mail
            </a>
            <p class="small-text">Atendimento de Seg a Sex, das 9h às 18h.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckCircle, MessageCircle, Mail } from 'lucide-vue-next'

const wppQuoteLink = "https://wa.me/5544999407976?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20uma%20impress%C3%A3o%203D%20personalizada."
</script>

<style scoped>
.quote-section {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.quote-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 4rem;
  background: linear-gradient(135deg, rgba(20, 24, 32, 0.8), rgba(30, 36, 48, 0.9));
  border: 1px solid rgba(230, 92, 0, 0.2);
}

.quote-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quote-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.quote-benefits {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quote-benefits li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
}

.benefit-icon {
  color: var(--secondary);
  width: 20px;
  height: 20px;
}

.quote-action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-card {
  background: var(--surface-color-light);
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.action-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.action-card p {
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.btn-large {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.icon-md {
  width: 20px;
  height: 20px;
}

.small-text {
  font-size: 0.8rem !important;
  margin-bottom: 0 !important;
  opacity: 0.7;
}

@media (max-width: 992px) {
  .quote-wrapper {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 2rem;
  }
}
</style>
