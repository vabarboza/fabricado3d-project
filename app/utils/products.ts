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
        '/images/01/Inicio.png',
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
        '/images/02/GatoGordo.png',
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
      images: ['/images/03/PokebolaChaveiro.png',
        '/images/03/chaveiro-pokebola-1.jpg'
      ],
      externalBuyLink: 'https://shopee.com.br'
    },
    {
      id: 4,
      name: 'Letreiro Decorativo Senhor dos Anéis',
      category: 'Decoração',
      description: 'Traga a magia da Terra Média para sua casa! Este letreiro exclusivo do Senhor dos Anéis é produzido com impressão 3D de alta precisão, apresentando o icônico logotipo da saga. Perfeito para decorar sua estante de livros, setup gamer ou escritório. Um item indispensável para colecionadores e fãs da obra de J.R.R. Tolkien. Feito em material de alta resistência com acabamento premium.',
      price: 'R$ 29,90',
      dimensions: '16cm x 4cm x 3cm',
      images: ['/images/04/LordOfRings.png',
        '/images/04/senhor-dos-aneis-3.jpg',
        '/images/04/senhor-dos-aneis-1.jpg',
        '/images/04/senhor-dos-aneis.jpg',
        '/images/04/senhor-dos-aneis-2.jpg'
      ],
      externalBuyLink: 'https://shopee.com.br'
    }
  ]
}

export const getWppLink = (itemName: string) => {
  const msg = `Olá! Gostaria de comprar o item do catálogo: ${itemName}.`
  return `https://wa.me/5544999407976?text=${encodeURIComponent(msg)}`
}
