import { useEffect, useMemo, useState } from 'react'
import { formatPrice, products } from './data/products'
import CatalogPage from './pages/CatalogPage.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import Icon from './components/Icon.jsx'
import ProductPage from './pages/ProductPage.jsx'
import './App.css'

function App() {
  // Mantém a rota em estado para atualizar a interface junto com o histórico do navegador.
  const [route, setRoute] = useState(() => window.location.pathname + window.location.search)
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('filter') || params.get('q') || ''
  })
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
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
    setMenuOpen(false)
    setMobileSearchOpen(false)
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

  const submitSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) params.set('filter', search.trim())
    navigate(null, `/products${params.size ? `?${params.toString()}` : ''}`)
  }

  const addToCart = (product, size, color) => {
    setCartItems((items) => {
      const key = `${product.id}-${size || 'unico'}-${color || ''}`
      const existingItem = items.find((item) => item.key === key)
      if (existingItem) {
        return items.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...items, { key, product, size, color, quantity: 1 }]
    })
    setNotice(`${product.name} adicionado à sacola`)
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

  const isCatalog = routePath === '/produtos' || routePath === '/products'

  return (
    <div className="store">
      <div className="topline">
        <span>Frete grátis para compras acima de R$ 299</span>
        <a href="/produtos" onClick={(event) => navigate(event, '/produtos')}>
          Confira as novidades <Icon name="arrow" size={15} />
        </a>
      </div>

      <header className="site-header">
        <div className={`header-main ${mobileSearchOpen ? 'mobile-search-open' : ''}`}>
          <button
            type="button"
            className="icon-button mobile-menu-button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
          <a className="wordmark" href="/" onClick={(event) => navigate(event, '/')}>
            <span className="brand-symbol">D</span>
            <span>digital<span className="wordmark-accent">store</span><small>.</small></span>
          </a>

          <form className="search-form" role="search" onSubmit={submitSearch}>
            <input
              aria-label="Buscar produtos"
              placeholder="Buscar produto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit" aria-label="Pesquisar"><Icon name="search" size={20} /></button>
          </form>

          <div className="header-actions">
            <div className="account-links">
              <a className="account-link" href="/cadastro" onClick={(event) => {
                event.preventDefault()
                setNotice('Cadastro demonstrativo: autenticação não configurada.')
              }}>Cadastre-se</a>
              <a className="account-login" href="/login" onClick={(event) => {
                event.preventDefault()
                setNotice('Login demonstrativo: autenticação não configurada.')
              }}>Entrar</a>
            </div>
            <button
              className="icon-button mobile-search-button"
              aria-label={mobileSearchOpen ? 'Fechar busca' : 'Buscar produtos'}
              aria-expanded={mobileSearchOpen}
              type="button"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen)
                setMenuOpen(false)
              }}
            >
              <Icon name={mobileSearchOpen ? 'close' : 'search'} />
            </button>
            <div className="cart-wrap">
              <button
                type="button"
                className="icon-button cart-button"
                aria-label={`Sacola, ${cartCount} itens`}
                aria-expanded={cartOpen}
                onClick={() => setCartOpen(!cartOpen)}
              >
                <Icon name="cart" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
              {cartOpen && (
                <div className="cart-popover">
                  <div className="cart-popover-head">
                    <strong>Sua sacola</strong>
                    <button className="plain-icon" type="button" aria-label="Fechar sacola" onClick={() => setCartOpen(false)}><Icon name="close" size={18} /></button>
                  </div>
                  {cartItems.length === 0 ? (
                    <p className="empty-cart">Sua sacola está vazia.</p>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cartItems.map((item) => (
                          <div className="cart-item" key={item.key}>
                            <img src={item.product.image} alt="" />
                            <div className="cart-item-info">
                              <strong>{item.product.name}</strong>
                              {item.size && <span>Tamanho {item.size}</span>}
                              {item.color && <span>Cor {item.color} <i className="cart-color-swatch" style={{ backgroundColor: item.color }} /></span>}
                              <span>{formatPrice(item.product.price)}</span>
                              <div className="quantity-control">
                                <button type="button" aria-label="Diminuir quantidade" onClick={() => updateQuantity(item.key, -1)}>−</button>
                                <span>{item.quantity}</span>
                                <button type="button" aria-label="Aumentar quantidade" onClick={() => updateQuantity(item.key, 1)}>+</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="cart-total">
                        <span>Subtotal</span>
                        <strong>{formatPrice(cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0))}</strong>
                      </div>
                      <button className="button button-primary cart-checkout" type="button" onClick={() => setNotice('Checkout demonstrativo: sua sacola está pronta!')}>Continuar compra</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegação principal">
          <a className={!isCatalog && !productId ? 'active' : ''} href="/" onClick={(event) => navigate(event, '/')}>Home</a>
          <a className={isCatalog && selectedCategory === 'Todos' ? 'active' : ''} href="/products" onClick={(event) => navigate(event, '/products')}>Produtos</a>
          <a href="/products?categoria=Todos" onClick={(event) => navigate(event, '/products?categoria=Todos')}>Categorias</a>
          <a href="/pedidos" onClick={(event) => { event.preventDefault(); setNotice('Entre em contato para consultar seus pedidos.') }}>Meus Pedidos</a>
          <a className={isCatalog && selectedCategory === 'Tênis' ? 'active' : ''} href="/produtos?categoria=T%C3%AAnis" onClick={(event) => navigate(event, collectionLink('Tênis'))}>Tênis</a>
          <a className={isCatalog && selectedCategory === 'Camisetas' ? 'active' : ''} href="/produtos?categoria=Camisetas" onClick={(event) => navigate(event, collectionLink('Camisetas'))}>Camisetas</a>
          <a href="/produtos?categoria=Acess%C3%B3rios" onClick={(event) => navigate(event, collectionLink('Acessórios'))}>Acessórios</a>
          <a href="/produtos?categoria=Casual" onClick={(event) => navigate(event, collectionLink('Casual'))}>Ofertas</a>
        </nav>
      </header>

      <main>
        {isCatalog ? (
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
        )}
      </main>

      <Footer navigate={navigate} />
      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <button type="button" className="popover-dismiss" aria-label="Fechar sacola" onClick={() => setCartOpen(false)} />}
    </div>
  )
}

export default App
