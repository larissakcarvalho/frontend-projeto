import { useEffect, useMemo, useState } from 'react'
import { categories, formatPrice, products } from './data/products'
import './App.css'

const currentYear = new Date().getFullYear()

function Icon({ name, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'search') {
    return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>
  }
  if (name === 'cart') {
    return <svg {...common}><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.5L22 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
  }
  if (name === 'user') {
    return <svg {...common}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.6-3.3 3.3-5.4 7-5.4s6.4 2.1 7 5.4" /></svg>
  }
  if (name === 'arrow') {
    return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  }
  if (name === 'chevron') {
    return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>
  }
  if (name === 'menu') {
    return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  }
  if (name === 'close') {
    return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>
  }
  if (name === 'truck') {
    return <svg {...common}><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></svg>
  }
  if (name === 'return') {
    return <svg {...common}><path d="M4 10a8 8 0 1 1 1.7 7.9M4 4v6h6" /></svg>
  }
  return <svg {...common}><path d="M12 3v18M3 12h18" /></svg>
}

function App() {
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

function HomePage({ navigate, collectionLink, addToCart }) {
  const featured = products
  const [heroSlide, setHeroSlide] = useState(0)
  const heroProduct = featured[heroSlide]

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">ESTILO QUE ACOMPANHA VOCÊ</span>
          <h1>Seu próximo<br /><span>passo começa aqui.</span></h1>
          <p>Encontre o equilíbrio perfeito entre conforto, atitude e o seu jeito de viver.</p>
          <a className="button button-primary" href="/produtos" onClick={(event) => navigate(event, '/produtos')}>
            Explorar coleção <Icon name="arrow" size={18} />
          </a>
          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true"><span>J</span><span>M</span><span>A</span></div>
            <span><strong>+2.000 pessoas</strong><br />já encontraram seu estilo</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Tênis esportivo em destaque">
          <div className="hero-circle" />
          <span className="hero-caption">NOVA COLEÇÃO<br /><strong>SPRING / 26</strong></span>
          <img src={heroProduct.image} alt={heroProduct.name} />
          <div className="hero-product-tag"><span>{heroProduct.name.toUpperCase()}</span><strong>Do seu jeito.</strong></div>
          <span className="hero-number">0{heroSlide + 1}</span>
          <div className="hero-gallery-controls" aria-label="Controles do destaque">
            <button type="button" aria-label="Produto em destaque anterior" disabled={heroSlide === 0} onClick={() => setHeroSlide(heroSlide - 1)}>‹</button>
            <button type="button" aria-label="Próximo produto em destaque" disabled={heroSlide === featured.length - 1} onClick={() => setHeroSlide(heroSlide + 1)}>›</button>
          </div>
        </div>
        <div className="hero-dots" aria-label="Selecionar produto em destaque">
          {featured.map((product, index) => (
            <button
              key={product.id}
              type="button"
              className={heroSlide === index ? 'selected' : ''}
              aria-label={`Exibir ${product.name}`}
              aria-current={heroSlide === index ? 'true' : undefined}
              onClick={() => setHeroSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="benefits-strip" aria-label="Benefícios da loja">
        <Benefit icon="truck" title="Frete grátis" text="Acima de R$ 299" />
        <Benefit icon="return" title="Troca fácil" text="Até 30 dias" />
        <Benefit icon="plus" title="Parcele em até 10x" text="Sem juros no cartão" />
      </section>

      <section className="categories-section section-wrap">
        <div className="section-heading category-heading">
          <div><span className="eyebrow">ESCOLHA O SEU ESTILO</span><h2>Coleções em destaque</h2></div>
          <a className="text-link" href="/produtos" onClick={(event) => navigate(event, '/produtos')}>Ver todas <Icon name="arrow" size={17} /></a>
        </div>
        <div className="category-grid">
          <CategoryTile title="Tênis" note="Para ir mais longe" image={products[1].image} href={collectionLink('Tênis')} navigate={navigate} />
          <CategoryTile title="Casual" note="Conforto sem esforço" image={products[5].image} href={collectionLink('Casual')} navigate={navigate} />
          <CategoryTile title="Acessórios" note="Detalhes que fazem" image={products[6].image} href={collectionLink('Acessórios')} navigate={navigate} />
        </div>
      </section>

      <section className="featured-section section-wrap">
        <div className="section-heading">
          <div><span className="eyebrow">SELEÇÃO DA SEMANA</span><h2>Produtos em alta</h2></div>
          <a className="text-link" href="/produtos" onClick={(event) => navigate(event, '/produtos')}>Ver coleção completa <Icon name="arrow" size={17} /></a>
        </div>
        <ProductGrid products={featured} navigate={navigate} addToCart={addToCart} />
      </section>

      <section className="promo-banner section-wrap">
        <div className="promo-content">
          <span className="eyebrow">SEU ESTILO, SEU MOMENTO</span>
          <h2>Um clássico.<br />Mil possibilidades.</h2>
          <p>Conheça peças que fazem parte da sua história — todos os dias.</p>
          <a className="button button-light" href={collectionLink('Casual')} onClick={(event) => navigate(event, collectionLink('Casual'))}>Descobrir agora <Icon name="arrow" size={17} /></a>
        </div>
        <div className="promo-image">
          <img src={products[2].image} alt="Tênis casual branco em fundo neutro" />
          <span>FEITO PARA<br />O SEU CAMINHO</span>
        </div>
      </section>

      <section className="newsletter-section">
        <div>
          <span className="eyebrow">FICA A DICA</span>
          <h2>Novidades boas chegam por e-mail.</h2>
          <p>Cadastre-se e receba novidades, lançamentos e condições especiais.</p>
        </div>
        <NewsletterForm />
      </section>
    </>
  )
}

const priceOptions = [
  { label: 'Até R$ 200', value: '0-200', min: 0, max: 200 },
  { label: 'R$ 200 a R$ 400', value: '200-400', min: 200, max: 400 },
  { label: 'Acima de R$ 400', value: '400+', min: 400, max: Infinity },
]

function CatalogPage({ products: allProducts, selectedCategory, searchTerm, navigate, collectionLink }) {
  const [sortBy, setSortBy] = useState('relevance')
  const [mobileFilters, setMobileFilters] = useState(false)
  const [priceRanges, setPriceRanges] = useState([])
  const filteredProducts = useMemo(() => {
    const normalizeText = (value) =>
      value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const normalizedSearch = normalizeText(searchTerm)
    const matching = allProducts.filter((product) => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory || product.type === selectedCategory
      const matchesSearch = !normalizedSearch || normalizeText(`${product.name} ${product.category} ${product.type}`).includes(normalizedSearch)
      const matchesPrice = priceRanges.length === 0 || priceRanges.some((range) => {
        const option = priceOptions.find((priceOption) => priceOption.value === range)
        return option && product.price >= option.min && product.price <= option.max
      })
      return matchesCategory && matchesSearch && matchesPrice
    })
    if (sortBy === 'price-low') return [...matching].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') return [...matching].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') return [...matching].sort((a, b) => b.rating - a.rating)
    return matching
  }, [allProducts, selectedCategory, searchTerm, sortBy, priceRanges])

  const togglePriceRange = (range) => {
    setPriceRanges((selected) =>
      selected.includes(range)
        ? selected.filter((item) => item !== range)
        : [...selected, range],
    )
  }

  const heading = searchTerm
    ? `Resultados para “${searchTerm}”`
    : selectedCategory === 'Todos'
      ? 'Todos os produtos'
      : selectedCategory

  return (
    <section className="catalog-page section-wrap">
      <div className="breadcrumbs">
        <a href="/" onClick={(event) => navigate(event, '/')}>Home</a><Icon name="chevron" size={14} /><span>Produtos</span>
        {selectedCategory !== 'Todos' && <><Icon name="chevron" size={14} /><span>{selectedCategory}</span></>}
      </div>
      <div className="catalog-heading">
        <div><span className="eyebrow">ENCONTRE O SEU PRÓXIMO FAVORITO</span><h1>{heading}</h1></div>
        <span className="results-count">{filteredProducts.length} produtos</span>
      </div>
      <div className="catalog-toolbar">
        <button type="button" className="filter-toggle" onClick={() => setMobileFilters(!mobileFilters)}>
          <Icon name="menu" size={18} /> Categorias
        </button>
        <label className="sort-control mobile-sort-control">
          <span>Ordenar por</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Ordenar produtos">
            <option value="relevance">Mais relevantes</option>
            <option value="price-low">Menor preço</option>
            <option value="price-high">Maior preço</option>
            <option value="rating">Melhor avaliação</option>
          </select>
        </label>
      </div>
      <div className="catalog-layout">
        <aside className={`category-sidebar ${mobileFilters ? 'filters-open' : ''}`}>
          <label className="sort-control">
            <span>Ordenar por</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Ordenar produtos">
              <option value="relevance">Mais relevantes</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
              <option value="rating">Melhor avaliação</option>
            </select>
          </label>
          <h2>Filtrar por</h2>
          <div className="filter-group">
            <strong>Categoria</strong>
            {categories.map((category) => (
              <label key={category} className={selectedCategory === category ? 'selected' : ''}>
                <input
                  type="radio"
                  name="product-category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => navigate(null, collectionLink(category))}
                />
                <span className="filter-category-name">{category}</span>
                <span className="filter-count">{category === 'Todos' ? allProducts.length : allProducts.filter((product) => product.category === category || product.type === category).length}</span>
              </label>
            ))}
          </div>
          <div className="filter-group price-filter-group">
            <strong>Preço</strong>
            {priceOptions.map((option) => (
              <label key={option.value} className={priceRanges.includes(option.value) ? 'selected' : ''}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={priceRanges.includes(option.value)}
                  onChange={() => togglePriceRange(option.value)}
                />
                <span className="filter-category-name">{option.label}</span>
              </label>
            ))}
          </div>
          <div className="filter-note"><span>Precisa de ajuda?</span><p>Escolha por categoria e encontre o que combina com você.</p></div>
        </aside>
        <div className="catalog-results">
          {filteredProducts.length ? (
            <ProductGrid products={filteredProducts} navigate={navigate} />
          ) : (
            <div className="no-results">
              <span className="eyebrow">NÃO ENCONTRAMOS</span>
              <h2>Nenhum produto por aqui.</h2>
              <p>Tente buscar por outro nome ou veja todos os produtos.</p>
              <a className="button button-primary" href="/produtos" onClick={(event) => navigate(event, '/produtos')}>Ver todos os produtos</a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProductPage({ product, navigate, addToCart, setNotice }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const similarProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)
  const galleryImages = [
    { label: 'Imagem completa', className: 'gallery-image-full' },
    { label: 'Detalhe aproximado', className: 'gallery-image-detail' },
    { label: 'Vista lateral', className: 'gallery-image-side' },
  ]

  const selectImage = (index) => {
    setActiveImage(Math.max(0, Math.min(galleryImages.length - 1, index)))
  }

  const handleAdd = () => {
    if (product.sizes.length && !selectedSize) {
      setSizeError(true)
      return
    }
    for (let i = 0; i < quantity; i += 1) addToCart(product, selectedSize, selectedColor)
    setSizeError(false)
  }

  return (
    <>
      <section className="product-detail section-wrap">
        <div className="breadcrumbs">
          <a href="/" onClick={(event) => navigate(event, '/')}>Home</a><Icon name="chevron" size={14} />
          <a href="/produtos" onClick={(event) => navigate(event, '/produtos')}>Produtos</a><Icon name="chevron" size={14} />
          <span>{product.name}</span>
        </div>
        <div className="product-detail-grid">
          <div className="product-gallery">
            <div className="product-main-image">
              <span className="product-image-label">{product.category}</span>
              <img
                className={galleryImages[activeImage].className}
                src={product.image}
                alt={`${product.name} — ${galleryImages[activeImage].label}`}
              />
              <button
                type="button"
                className="gallery-arrow gallery-arrow-previous"
                aria-label="Imagem anterior"
                disabled={activeImage === 0}
                onClick={() => selectImage(activeImage - 1)}
              >‹</button>
              <button
                type="button"
                className="gallery-arrow gallery-arrow-next"
                aria-label="Próxima imagem"
                disabled={activeImage === galleryImages.length - 1}
                onClick={() => selectImage(activeImage + 1)}
              >›</button>
            </div>
            <div className="gallery-thumbnails" aria-label="Miniaturas do produto">
              {galleryImages.map((image, index) => (
                <button
                  key={image.className}
                  type="button"
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  aria-label={image.label}
                  aria-pressed={activeImage === index}
                  onClick={() => selectImage(index)}
                >
                  <img className={image.className} src={product.image} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div className="product-info">
            <span className="eyebrow">{product.category} / {product.type}</span>
            <h1>{product.name}</h1>
            <p className="product-sku">REF: DS-{product.id.slice(-6).toUpperCase()}</p>
            <div className="rating-line"><span className="stars">★★★★★</span><strong>{product.rating.toFixed(1)}</strong><span>({product.reviews} avaliações)</span></div>
            <p className="detail-description">{product.description}</p>
            <div className="detail-price">
              {product.oldPrice > 0 && <del>{formatPrice(product.oldPrice)}</del>}
              <strong>{formatPrice(product.price)}</strong>
              {product.discount > 0 && <span>{product.discount}% OFF</span>}
            </div>
            <p className="installment-text">ou 10x de {formatPrice(product.price / 10)} sem juros</p>
            {product.sizes.length > 0 && (
              <div className="size-selector">
                <div className="size-title"><strong>Escolha o tamanho</strong><button type="button" onClick={() => setNotice('Consulte o guia de tamanhos para encontrar seu ajuste ideal.')}>Guia de tamanhos</button></div>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button key={size} type="button" className={selectedSize === size ? 'selected' : ''} aria-pressed={selectedSize === size} onClick={() => { setSelectedSize(size); setSizeError(false) }}>{size}</button>
                  ))}
                </div>
                {sizeError && <p className="field-error" role="alert">Selecione um tamanho para continuar.</p>}
              </div>
            )}
            {product.colors.length > 0 && (
              <div className="size-selector color-selector">
                <div className="size-title"><strong>Escolha a cor</strong><span>{selectedColor}</span></div>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={selectedColor === color ? 'selected' : ''}
                      style={{ backgroundColor: color }}
                      aria-label={`Selecionar cor ${color}`}
                      aria-pressed={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="add-actions">
              <div className="quantity-control detail-quantity">
                <button type="button" aria-label="Diminuir quantidade" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button type="button" aria-label="Aumentar quantidade" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button type="button" className="button button-primary add-button" onClick={handleAdd}>Adicionar à sacola <Icon name="cart" size={19} /></button>
            </div>
            <div className="shipping-info"><Icon name="truck" size={21} /><div><strong>Frete grátis acima de R$ 299</strong><span>Troca fácil em até 30 dias.</span></div></div>
          </div>
        </div>
      </section>
      {similarProducts.length > 0 && (
        <section className="featured-section section-wrap related-section">
          <div className="section-heading"><div><span className="eyebrow">VOCÊ TAMBÉM PODE GOSTAR</span><h2>Produtos recomendados</h2></div><a className="text-link" href="/products" onClick={(event) => navigate(event, '/products')}>Ver todos <Icon name="arrow" size={17} /></a></div>
          <ProductGrid products={similarProducts} navigate={navigate} />
        </section>
      )}
    </>
  )
}

function ProductGrid({ products: items, navigate, addToCart }) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <article className="product-card" key={product.id}>
          <a className="product-card-image" href={`/product/${product.id}`} onClick={(event) => navigate(event, `/product/${product.id}`)}>
            {product.badge && <span className={`product-badge ${product.discount ? '' : 'badge-dark'}`}>{product.badge}</span>}
            <img src={product.image} alt={product.name} loading="lazy" />
            <span className="quick-view">Ver produto <Icon name="arrow" size={16} /></span>
          </a>
          <div className="product-card-info">
            <span className="product-category">{product.category}</span>
            <a href={`/product/${product.id}`} onClick={(event) => navigate(event, `/product/${product.id}`)} className="product-name">{product.name}</a>
            <div className="product-card-rating"><span>★★★★★</span> {product.rating.toFixed(1)} <small>({product.reviews})</small></div>
            <div className="card-price">{product.oldPrice > 0 && <del>{formatPrice(product.oldPrice)}</del>}<strong>{formatPrice(product.price)}</strong></div>
            <span className="card-installment">ou 10x de {formatPrice(product.price / 10)} sem juros</span>
            {addToCart && (
              <button
                type="button"
                className="quick-add"
                onClick={() => product.sizes.length || product.colors.length
                  ? navigate(null, `/product/${product.id}`)
                  : addToCart(product)}
              >
                {product.sizes.length || product.colors.length ? 'Escolher opções' : 'Adicionar à sacola'}
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

function Benefit({ icon, title, text }) {
  return <div className="benefit"><span className="benefit-icon"><Icon name={icon} size={22} /></span><div><strong>{title}</strong><span>{text}</span></div></div>
}

function CategoryTile({ title, note, image, href, navigate }) {
  return (
    <a className="category-tile" href={href} onClick={(event) => navigate(event, href)}>
      <img src={image} alt="" loading="lazy" />
      <span className="category-tile-overlay" />
      <span className="category-tile-copy"><small>{note}</small><strong>{title}</strong><span className="category-arrow"><Icon name="arrow" size={17} /></span></span>
    </a>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      {submitted ? (
        <p className="newsletter-success" role="status">Pronto! Você receberá nossas novidades em breve.</p>
      ) : (
        <>
          <label className="visually-hidden" htmlFor="newsletter-email">Seu melhor e-mail</label>
          <input id="newsletter-email" type="email" placeholder="Seu melhor e-mail" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <button className="button button-primary" type="submit">Quero receber <Icon name="arrow" size={17} /></button>
        </>
      )}
    </form>
  )
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-main section-wrap">
        <div className="footer-brand">
          <a className="wordmark footer-wordmark" href="/" onClick={(event) => navigate(event, '/')}>
            <span className="brand-symbol">D</span><span>digital<span className="wordmark-accent">store</span><small>.</small></span>
          </a>
          <p>O seu próximo passo começa com escolhas que têm a sua cara.</p>
          <div className="social-links"><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://tiktok.com" aria-label="TikTok">tk</a></div>
        </div>
        <div className="footer-column"><strong>Institucional</strong><a href="#sobre">Sobre nós</a><a href="#privacidade">Política de privacidade</a><a href="#termos">Termos de uso</a></div>
        <div className="footer-column"><strong>Ajuda</strong><a href="#entrega">Entrega e frete</a><a href="#trocas">Trocas e devoluções</a><a href="#contato">Fale conosco</a></div>
        <div className="footer-column footer-contact"><strong>Fale com a gente</strong><span>Seg a sex, das 9h às 18h</span><a href="mailto:oi@digitalstore.com.br">oi@digitalstore.com.br</a><span>(11) 4002-8922</span></div>
      </div>
      <div className="footer-bottom"><span>© {currentYear} Digital Store. Todos os direitos reservados.</span><span>Feito para acompanhar você.</span></div>
    </footer>
  )
}

export default App
