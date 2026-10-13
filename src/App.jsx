import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { formatPrice, products } from './data/products'
import facebookIcon from './assets/facebook.svg'
import instagramIcon from './assets/instagram.svg'
import tiktokIcon from './assets/tiktok.svg'
import Icon from './components/Icon'
import Information from './components/Information'
import Logo from './components/Logo'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductViewPage from './pages/ProductViewPage'
import Layout from './pages/Layout'
import './App.css'

const currentYear = new Date().getFullYear()

function App() {
  return (
    <BrowserRouter>
      <StoreApp />
    </BrowserRouter>
  )
}

function StoreApp() {
  const routerNavigate = useNavigate()
  const location = useLocation()
  const [searchDraft, setSearchDraft] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const navigate = (event, destination) => {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return
    event?.preventDefault()
    routerNavigate(destination)
    setMenuOpen(false)
    setMobileSearchOpen(false)
    setCartOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const routePath = location.pathname
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get('filter') || searchParams.get('q') || ''
  const routeSearch = searchParams.get('filter') || searchParams.get('q') || ''
  const search = searchDraft?.locationKey === location.key ? searchDraft.value : routeSearch
  const selectedCategory = searchParams.get('categoria') || searchParams.get('category') || 'Todos'
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
  const categoryNavigation = searchParams.get('view') === 'categories'

  return (
    <Layout
      header={
        <>
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
          <Logo onClick={(event) => navigate(event, '/')} />

          <form className="search-form" role="search" onSubmit={submitSearch}>
            <input
              aria-label="Buscar produtos"
              placeholder="Buscar produto..."
              value={search}
              onChange={(event) => setSearchDraft({ locationKey: location.key, value: event.target.value })}
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
          <a className={routePath === '/' ? 'active' : ''} href="/" onClick={(event) => navigate(event, '/')}>Home</a>
          <a className={isCatalog && !categoryNavigation ? 'active' : ''} href="/products" onClick={(event) => navigate(event, '/products')}>Produtos</a>
          <a className={isCatalog && categoryNavigation ? 'active' : ''} href="/products?categoria=Todos&view=categories" onClick={(event) => navigate(event, '/products?categoria=Todos&view=categories')}>Categorias</a>
          <a href="/pedidos" onClick={(event) => { event.preventDefault(); setNotice('Entre em contato para consultar seus pedidos.') }}>Meus Pedidos</a>
        </nav>
      </header>
        </>
      }
      footer={<Footer navigate={navigate} />}
    >
      <Routes>
        <Route path="/" element={<HomePage navigate={navigate} collectionLink={collectionLink} addToCart={addToCart} />} />
        <Route
          path="/products"
          element={<ProductListingPage products={products} selectedCategory={selectedCategory} searchTerm={searchTerm} navigate={navigate} collectionLink={collectionLink} />}
        />
        <Route
          path="/produtos"
          element={<ProductListingPage products={products} selectedCategory={selectedCategory} searchTerm={searchTerm} navigate={navigate} collectionLink={collectionLink} />}
        />
        <Route
          path="/product/:id"
          element={selectedProduct
            ? <ProductViewPage key={selectedProduct.id} product={selectedProduct} navigate={navigate} addToCart={addToCart} setNotice={setNotice} />
            : <NotFound navigate={navigate} />}
        />
        <Route
          path="/produto/:id"
          element={selectedProduct
            ? <ProductViewPage key={selectedProduct.id} product={selectedProduct} navigate={navigate} addToCart={addToCart} setNotice={setNotice} />
            : <NotFound navigate={navigate} />}
        />
        <Route path="*" element={<NotFound navigate={navigate} />} />
      </Routes>
      {notice && <div className="toast" role="status">{notice}</div>}
      {cartOpen && <button type="button" className="popover-dismiss" aria-label="Fechar sacola" onClick={() => setCartOpen(false)} />}
    </Layout>
  )
}

function NotFound({ navigate }) {
  return (
    <section className="not-found">
      <span className="eyebrow">OPS!</span>
      <h1>Não encontramos essa página.</h1>
      <p>Mas ainda dá tempo de encontrar seu próximo favorito.</p>
      <a className="button button-primary" href="/" onClick={(event) => navigate(event, '/')}>Voltar para a página inicial</a>
    </section>
  )
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-main section-wrap">
        <div className="footer-brand">
          <Logo light onClick={(event) => navigate(event, '/')} />
          <p>O seu próximo passo começa com escolhas que têm a sua cara.</p>
          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
            <a href="https://facebook.com" aria-label="Facebook"><img src={facebookIcon} alt="" /></a>
            <a href="https://tiktok.com" aria-label="TikTok"><img src={tiktokIcon} alt="" /></a>
          </div>
        </div>
        <Information title="Institucional" informations={[
          { text: 'Sobre nós', link: '#sobre' },
          { text: 'Política de privacidade', link: '#privacidade' },
          { text: 'Termos de uso', link: '#termos' },
        ]} />
        <Information title="Ajuda" informations={[
          { text: 'Entrega e frete', link: '#entrega' },
          { text: 'Trocas e devoluções', link: '#trocas' },
          { text: 'Fale conosco', link: '#contato' },
        ]} />
        <div className="footer-column footer-contact"><strong>Fale com a gente</strong><span>Seg a sex, das 9h às 18h</span><a href="mailto:oi@digitalstore.com.br">oi@digitalstore.com.br</a><span>(11) 4002-8922</span></div>
      </div>
      <hr className="footer-separator" />
      <div className="footer-bottom"><span>© {currentYear} Digital Store. Todos os direitos reservados.</span><span>Feito para acompanhar você.</span></div>
    </footer>
  )
}

export default App
