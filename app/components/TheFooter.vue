<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <div class="logo">
          <img src="/logo.png" alt="Logo Fábrica do 3D" class="brand-logo" />
          <span>Fábrica do <span class="highlight">3D</span></span>
        </div>
        <p class="footer-desc">Especialistas em impressão 3D FDM. Qualidade e precisão para os seus projetos ganharem vida.</p>
        <div class="social-links">
          <a href="#" class="social-icon"><Instagram /></a>
          <a href="#" class="social-icon"><Facebook /></a>
          <a href="#" class="social-icon"><Twitter /></a>
        </div>
      </div>
      
      <div class="footer-links">
        <h3>Links Úteis</h3>
        <ul>
          <li><a href="#hero">Início</a></li>
          <li><a href="#catalog">Catálogo de Produtos</a></li>
          <li><a href="#quote">Orçamento Personalizado</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h3>Contato</h3>
        <ul>
          <li><Mail class="icon-xs" /> contato@fabricado3d.com.br</li>
          <li><Phone class="icon-xs" /> (44) 99999-9999</li>
          <li><MapPin class="icon-xs" /> Maringa, PR</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Fábrica do 3D. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
import { Printer, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-vue-next'
</script>

<style scoped>
.footer {
  background-color: var(--bg-color);
  border-top: 1px solid var(--glass-border);
  padding-top: 4rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.brand-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px; /* Optional, makes it look neat */
  object-fit: cover;
}


.highlight {
  color: var(--secondary);
}

.footer-desc {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  max-width: 300px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface-color);
  color: var(--text-main);
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--primary);
  transform: translateY(-3px);
}

.footer-links h3, .footer-contact h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.footer-links ul, .footer-contact ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-links a {
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--primary);
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
}

.icon-xs {
  width: 16px;
  height: 16px;
  color: var(--secondary);
}

.footer-bottom {
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid var(--glass-border);
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
