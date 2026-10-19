import { useEffect, useMemo, useState } from 'react'
import { products } from './data/products'
import CatalogPage from './pages/CatalogPage.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Layout from './pages/Layout.jsx'
import './App.css'

function App() {
  const [route, setRoute] = useState(() => window.location.pathname + window.location.search)
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('filter') || params.get('q') || ''
  })
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const syncRoute = () => {
      const currentRoute = window.location.pathname + window.location.search
      const params = new URLSearchParams(window.location.search)
      setRoute(currentRoute)
      setSearch(params.get('filter') || params.get('q') || '')
    }
    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const navigate = (event, destination) => {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return
    event?.preventDefault()
    window.history.pushState({}, '', destination)
    setRoute(destination)
    const params = new URL(destination, window.location.origin).searchParams
    setSearch(params.get('filter') || params.get('q') || '')
    setCartOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const location = useMemo(() => new URL(route, window.location.origin), [route])
  const routePath = location.pathname
  const searchTerm = location.searchParams.get('filter') || location.searchParams.get('q') || ''
  const selectedCategory = location.searchParams.get('categoria') || location.searchParams.get('category') || 'Todos'
  const productId = routePath.match(/^\/(?:produto|product)\/([^/]+)$/)?.[1] || ''
  const selectedProduct = products.find((product) => product.id === productId)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const isCatalog = routePath === '/produtos' || routePath === '/products'

  const submitSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) params.set('filter', search.trim())
    navigate(null, `/products${params.size ? `?${params.toString()}` : ''}`)
  }

  const addToCart = (product, size, color, quantity = 1) => {
    setCartItems((items) => {
      const key = `${product.id}-${size || 'unico'}-${color || ''}`
      const existingItem = items.find((item) => item.key === key)
      if (existingItem) {
        return items.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...items, { key, product, size, color, quantity }]
    })
    setNotice(`${product.name} adicionado à sacola${quantity > 1 ? ` (${quantity} unidades)` : ''}`)
    setCartOpen(true)
  }

  const updateQuantity = (key, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const collectionLink = (category = 'Todos') =>
    `/produtos${category === 'Todos' ? '' : `?categoria=${encodeURIComponent(category)}`}`

  const header = (
    <Header
      navigate={navigate}
      search={search}
      setSearch={setSearch}
      submitSearch={submitSearch}
      setNotice={setNotice}
      routePath={routePath}
      route={route}
      isCatalog={isCatalog}
      productId={productId}
      cartCount={cartCount}
      cartItems={cartItems}
      cartOpen={cartOpen}
      setCartOpen={setCartOpen}
      updateQuantity={updateQuantity}
    />
  )

  const page = isCatalog ? (
    <CatalogPage
      products={products}
      selectedCategory={selectedCategory}
      searchTerm={searchTerm}
      navigate={navigate}
      collectionLink={collectionLink}
    />
  ) : selectedProduct ? (
    <ProductPage
      key={selectedProduct.id}
      product={selectedProduct}
      navigate={navigate}
      addToCart={addToCart}
      setNotice={setNotice}
    />
  ) : routePath === '/' ? (
    <HomePage navigate={navigate} collectionLink={collectionLink} addToCart={addToCart} />
  ) : (
    <section className="not-found">
      <span className="eyebrow">OPS!</span>
      <h1>Não encontramos essa página.</h1>
      <p>Mas ainda dá tempo de encontrar seu próximo favorito.</p>
      <a className="button button-primary" href="/" onClick={(event) => navigate(event, '/')}>Voltar para a página inicial</a>
    </section>
  )

  return (
    <Layout
      header={header}
      footer={<Footer navigate={navigate} />}
      notice={notice}
      overlayOpen={cartOpen}
      onDismissOverlay={() => setCartOpen(false)}
    >
      {page}
    </Layout>
  )
}

export default App
