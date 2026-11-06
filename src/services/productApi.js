const API_BASE_URL = (import.meta.env.VITE_API_URL || (
  import.meta.env.DEV ? '/api' : 'https://store-backend-projeto.vercel.app'
))
  .replace(/\/+$/, '')

async function fetchJson(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal })
  if (!response.ok) {
    throw new Error(`A solicitação à API falhou (HTTP ${response.status}).`)
  }
  return response.json()
}

function mapProduct(product, categoriesById) {
  const productCategories = (product.category_ids || [])
    .map((id) => categoriesById.get(id)?.name)
    .filter(Boolean)
  const category = productCategories[0] || 'Sem categoria'
  const originalPrice = Number(product.price)
  const discountedPrice = Number(product.price_with_discount)
  const hasDiscount = discountedPrice > 0 && discountedPrice < originalPrice
  const images = (product.images || [])
    .map((image) => image.content)
    .filter((image) => typeof image === 'string' && image.length > 0)
    .map((image) => image.startsWith('/media/') ? `${API_BASE_URL}${image}` : image)
  const options = product.options || []

  if (!Number.isFinite(originalPrice) || originalPrice < 0 || !images.length) return null

  return {
    id: String(product.id),
    name: product.name,
    category,
    type: productCategories[1] || category,
    price: hasDiscount ? discountedPrice : originalPrice,
    oldPrice: hasDiscount ? originalPrice : 0,
    discount: hasDiscount ? Math.round((1 - discountedPrice / originalPrice) * 100) : 0,
    rating: null,
    reviews: null,
    colors: options.filter((option) => option.type === 'color').flatMap((option) => option.values || []),
    sizes: options.filter((option) => option.type !== 'color').flatMap((option) => option.values || []),
    image: images[0],
    images,
    description: product.description || 'Produto disponível no catálogo da loja.',
    badge: hasDiscount ? `${Math.round((1 - discountedPrice / originalPrice) * 100)}% OFF` : '',
    source: 'api',
  }
}

export async function fetchCatalogProducts(signal) {
  const [categoryData, productData] = await Promise.all([
    fetchJson('/v1/category/search?limit=-1', signal),
    fetchJson('/v1/product/search?limit=-1', signal),
  ])
  const categories = Array.isArray(categoryData.data) ? categoryData.data : []
  const products = Array.isArray(productData.data) ? productData.data : []
  const categoriesById = new Map(categories.map((category) => [category.id, category]))
  const mappedProducts = products.map((product) => mapProduct(product, categoriesById)).filter(Boolean)

  if (!mappedProducts.length) {
    throw new Error('A API não retornou produtos disponíveis para exibição.')
  }

  return {
    products: mappedProducts,
    categories: categories.map((category) => category.name),
  }
}
