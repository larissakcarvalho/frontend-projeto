export const categories = [
  'Todos',
  'Tênis',
  'Casual',
  'Corrida',
  'Camisetas',
  'Acessórios',
]

export const products = [
  {
    id: 'tenis-urban-classic',
    name: 'Tênis Urban Classic',
    category: 'Tênis',
    type: 'Casual',
    price: 299.9,
    oldPrice: 399.9,
    discount: 25,
    rating: 4.8,
    reviews: 128,
    colors: ['#e9e7e3', '#252525', '#8b684d'],
    sizes: [38, 39, 40, 41, 42, 43],
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
    description:
      'O clássico que acompanha qualquer caminho. Confortável, versátil e feito para entrar na sua rotina sem esforço.',
    badge: '25% OFF',
  },
  {
    id: 'tenis-runner-pro',
    name: 'Tênis Runner Pro',
    category: 'Tênis',
    type: 'Corrida',
    price: 449.9,
    oldPrice: 529.9,
    discount: 15,
    rating: 4.9,
    reviews: 96,
    colors: ['#d5dfe7', '#e5c5bf', '#333333'],
    sizes: [37, 38, 39, 40, 41, 42],
    image:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85',
    description:
      'Leveza e resposta a cada passo. Um tênis pensado para seus treinos, corridas e novos recordes.',
    badge: 'NOVO',
  },
  {
    id: 'tenis-street-low',
    name: 'Tênis Street Low',
    category: 'Tênis',
    type: 'Casual',
    price: 329.9,
    oldPrice: 0,
    discount: 0,
    rating: 4.7,
    reviews: 74,
    colors: ['#d9d2c7', '#393837'],
    sizes: [38, 39, 40, 41, 42, 43],
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85',
    description:
      'Design urbano e acabamento premium para deixar seu visual pronto em qualquer ocasião.',
    badge: '',
  },
  {
    id: 'tenis-air-motion',
    name: 'Tênis Air Motion',
    category: 'Tênis',
    type: 'Corrida',
    price: 379.9,
    oldPrice: 449.9,
    discount: 15,
    rating: 4.6,
    reviews: 53,
    colors: ['#dce4e7', '#d8c8bf'],
    sizes: [37, 38, 39, 40, 41, 42],
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85',
    description:
      'Amortecimento macio, visual contemporâneo e conforto para ir mais longe todos os dias.',
    badge: '15% OFF',
  },
  {
    id: 'camiseta-essential',
    name: 'Camiseta Essential',
    category: 'Camisetas',
    type: 'Essenciais',
    price: 89.9,
    oldPrice: 119.9,
    discount: 25,
    rating: 4.8,
    reviews: 112,
    colors: ['#e6e2dc', '#202020', '#d7b8aa'],
    sizes: ['P', 'M', 'G', 'GG'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
    description:
      'A camiseta que combina com tudo. Toque macio e caimento confortável para usar o ano inteiro.',
    badge: 'MAIS VENDIDO',
  },
  {
    id: 'moletom-comfort',
    name: 'Moletom Comfort',
    category: 'Casual',
    type: 'Essenciais',
    price: 219.9,
    oldPrice: 0,
    discount: 0,
    rating: 4.7,
    reviews: 68,
    colors: ['#bfc4c2', '#d8c9b9', '#272727'],
    sizes: ['P', 'M', 'G', 'GG'],
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85',
    description:
      'Seu novo favorito para os dias mais frescos: aconchegante por dentro e cheio de estilo por fora.',
    badge: 'NOVO',
  },
  {
    id: 'mochila-everyday',
    name: 'Mochila Everyday',
    category: 'Acessórios',
    type: 'Acessórios',
    price: 189.9,
    oldPrice: 239.9,
    discount: 20,
    rating: 4.8,
    reviews: 42,
    colors: ['#252525', '#8b735e'],
    sizes: [],
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
    description:
      'Espaço de sobra para a sua rotina, com compartimentos inteligentes e visual minimalista.',
    badge: '20% OFF',
  },
  {
    id: 'tenis-court-retro',
    name: 'Tênis Court Retro',
    category: 'Tênis',
    type: 'Casual',
    price: 349.9,
    oldPrice: 0,
    discount: 0,
    rating: 4.9,
    reviews: 87,
    colors: ['#ded9d2', '#465c4d'],
    sizes: [38, 39, 40, 41, 42, 43],
    image:
      'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85',
    description:
      'Inspirado nas quadras e feito para a cidade. Uma silhueta retrô com conforto de hoje.',
    badge: '',
  },
]

export const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
