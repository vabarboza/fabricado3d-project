export const getProducts = () => {
  return [
    {
      id: 1,
      name: 'Suporte Articulado',
      category: 'Mecânica',
      description: 'Suporte resistente para monitores e tablets, impresso em PETG.',
      price: 'R$ 80,00',
      dimensions: '15cm x 10cm x 5cm',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 2,
      name: 'Vaso Geométrico',
      category: 'Decoração',
      description: 'Vaso moderno para plantas pequenas. Impresso em PLA.',
      price: 'R$ 45,00',
      dimensions: '12cm x 12cm x 14cm',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 3,
      name: 'Action Figure - Guerreiro',
      category: 'Colecionáveis',
      description: 'Miniatura detalhada pronta para pintura (PLA).',
      price: 'R$ 120,00',
      dimensions: '8cm x 8cm x 15cm',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 4,
      name: 'Organizador de Cabos',
      category: 'Utilidades',
      description: 'Mantenha sua mesa limpa com organizadores modulares.',
      price: 'R$ 25,00',
      dimensions: '20cm x 5cm x 3cm',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 5,
      name: 'Engrenagem Planetária',
      category: 'Mecânica',
      description: 'Peça funcional para projetos de robótica e automação. Alta resistência mecânica.',
      price: 'R$ 55,00',
      dimensions: '10cm diametro x 3cm',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 6,
      name: 'Luminária Lua',
      category: 'Decoração',
      description: 'Luminária texturizada, imitando as crateras da lua (Translúcido).',
      price: 'R$ 95,00',
      dimensions: '15cm de diâmetro',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 7,
      name: 'Chaveiro Personalizado',
      category: 'Utilidades',
      description: 'Chaveiro com seu nome ou logo da empresa impresso em duas cores.',
      price: 'R$ 15,00',
      dimensions: '5cm x 2cm',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 8,
      name: 'Busto Dragão',
      category: 'Colecionáveis',
      description: 'Peça em grande escala rica em detalhes. Perfeita para estantes.',
      price: 'R$ 180,00',
      dimensions: '20cm x 15cm x 25cm',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 9,
      name: 'Gengar',
      category: 'Pokemon',
      description: 'Gengar em PLA',
      price: 'R$ 180,00',
      dimensions: '15cm x 15cm x 15cm',
      images: [null, null, null],
      externalBuyLink: 'https://shopee.com.br'
    }
  ]
}

export const getWppLink = (itemName: string) => {
  const msg = `Olá! Gostaria de comprar o item do catálogo: ${itemName}.`
  return `https://wa.me/5544999407976?text=${encodeURIComponent(msg)}`
}
