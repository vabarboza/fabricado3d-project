<template>
  <header class="navbar glass-panel">
    <div class="container navbar-content">
      <div class="logo">
        <NuxtLink to="/"><img src="/logo.png" alt="Logo Fábrica do 3D" class="brand-logo" /></NuxtLink>
        <span>Fábrica do <span class="highlight">3D</span></span>
      </div>
      <nav class="nav-links">
        <NuxtLink to="/">Início</NuxtLink>
        <NuxtLink to="/catalogo">Catálogo</NuxtLink>
        <a href="#quote" class="btn btn-primary btn-sm">
          <MessageCircle class="icon-sm" /> Orçamento Rápido
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { Printer, MessageCircle } from 'lucide-vue-next'
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 1200px;
  z-index: 100;
  padding: 0.75rem 1.5rem;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.2rem;
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

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-weight: 500;
}

.nav-links a:not(.btn) {
  transition: color 0.3s ease;
}

.nav-links a:not(.btn):hover {
  color: var(--primary);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.icon-sm {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem 0.75rem;
    width: 98%;
  }

  .logo {
    font-size: 1rem;
    gap: 0.4rem;
  }

  .brand-logo {
    width: 28px;
    height: 28px;
  }

  .nav-links a:not(.btn) {
    display: none;
  }

  .btn-sm {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }

  .icon-sm {
    width: 16px;
    height: 16px;
  }
}
</style>
