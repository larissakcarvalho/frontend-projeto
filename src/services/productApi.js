const PRODUCTS_API = 'https://dummyjson.com/products?limit=194&select=id,title,description,category,price,discountPercentage,rating,images,thumbnail,brand,tags'
const EXCHANGE_API = 'https://api.frankfurter.dev/v1/latest?base=USD&symbols=BRL'

const categoryMap = {
  'mens-shoes': 'Tênis',
  'womens-shoes': 'Tênis',
  'mens-shirts': 'Camisetas',
  tops: 'Camisetas',
  'womens-dresses': 'Casual',
  'womens-bags': 'Acessórios',
  'womens-jewellery': 'Acessórios',
  'womens-watches': 'Acessórios',
  'mens-watches': 'Acessórios',
  sunglasses: 'Acessórios',
}

const roundCurrency = (value) => Math.round(value * 100) / 100

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`A solicitação à API falhou (HTTP ${response.status}).`)
  }
  return response.json()
}

export async function fetchCatalogProducts(signal) {
  const [catalogData, exchangeData] = await Promise.all([
    fetchJson(PRODUCTS_API, signal),
    fetchJson(EXCHANGE_API, signal),
  ])
  const exchangeRate = exchangeData.rates?.BRL

  if (!Array.isArray(catalogData.products) || !catalogData.products.length) {
    throw new Error('A API não retornou produtos.')
  }
  if (!Number.isFinite(exchangeRate) || exchangeRate <= 0) {
    throw new Error('A API de câmbio retornou uma cotação inválida.')
  }

  const products = catalogData.products
    .filter((product) => categoryMap[product.category] && Number.isFinite(product.price) && product.price > 0)
    .map((product) => {
      const price = roundCurrency(product.price * exchangeRate)
      const discount = Math.min(95, Math.max(0, Number(product.discountPercentage) || 0))
      const oldPrice = discount > 0 ? roundCurrency(price / (1 - discount / 100)) : 0
      const images = (Array.isArray(product.images) ? product.images : [])
        .filter((image) => typeof image === 'string' && image.startsWith('https://'))

      if (!images.length && typeof product.thumbnail === 'string' && product.thumbnail.startsWith('https://')) {
        images.push(product.thumbnail)
      }

      const image = images[0]
      if (!image) return null

      return {
        id: `api-${product.id}`,
        name: product.title,
        category: categoryMap[product.category],
        type: product.category.includes('shoes')
          ? (product.tags?.some((tag) => /sport|running|fitness/i.test(tag)) ? 'Corrida' : 'Casual')
          : product.category.includes('shirt') || product.category === 'tops'
            ? 'Essenciais'
            : 'Acessórios',
        price,
        oldPrice,
        discount: Math.round(discount),
        rating: Number.isFinite(product.rating) ? product.rating : 0,
        reviews: null,
        colors: [],
        sizes: [],
        image,
        images,
        description: product.description || 'Produto disponível no catálogo de demonstração.',
        badge: discount >= 5 ? `${Math.round(discount)}% OFF` : '',
        source: 'api',
        brand: product.brand || '',
      }
    })
    .filter(Boolean)

  if (!products.length) {
    throw new Error('A API não retornou produtos das categorias utilizadas pela loja.')
  }

  const productsByCategory = new Map()
  for (const product of products) {
    const categoryProducts = productsByCategory.get(product.category) || []
    categoryProducts.push(product)
    productsByCategory.set(product.category, categoryProducts)
  }
  const balancedProducts = []
  while (balancedProducts.length < 24 && [...productsByCategory.values()].some((items) => items.length)) {
    for (const items of productsByCategory.values()) {
      if (items.length && balancedProducts.length < 24) balancedProducts.push(items.shift())
    }
  }

  return {
    products: balancedProducts,
    exchangeDate: exchangeData.date,
  }
}
