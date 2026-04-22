export const getProducts = () => {
  return [
    {
      id: 1,
      name: 'Dia das Mães',
      category: 'Decoração',
      description: 'Lindo enfeite "Mãe Eu Te Amo" impresso em 3D. O presente perfeito para demonstrar todo seu carinho.',
      price: 'R$ 30,00',
      dimensions: '18cm x 9cm x 2cm',
      images: [
        '/images/01/dia-das-maes.jpg',
        '/images/01/dia-das-maes-2.jpg',
        '/images/01/dia-das-maes-3.jpg'
      ],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 2,
      name: 'Gatinhos se Espreguiçando',
      category: 'Decoração',
      description: 'Adoráveis gatinhos fofos se espreguiçando, perfeitos para decorar qualquer ambiente. (1 unidade)',
      price: 'R$ 12,90',
      dimensions: '3.2cm x 5.7cm x 4cm',
      images: [
        '/images/02/gatos-fofos.jpg',
        '/images/02/gatos-fofos-1.jpg',
        '/images/02/gatos-fofos-2.jpg',
        '/images/02/gatos-fofos-3.jpg'
      ],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 3,
      name: 'Chaveiro Pokebola',
      category: 'Geek',
      description: 'Capture todos eles! Chaveiro Pokebola impresso em 3D com cores vibrantes e excelente acabamento. O acessório perfeito para fãs e treinadores Pokémon.',
      price: 'R$ 12,90',
      dimensions: '3.5cm de diâmetro',
      images: ['/images/03/chaveiro-pokebola-1.jpg'],
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
