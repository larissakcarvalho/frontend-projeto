import { useState } from 'react'
import { formatPrice } from '../data/products'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import miniCart from '../../assets/mini-cart.svg'

export default function Header({
  navigate,
  search,
  setSearch,
  submitSearch,
  setNotice,
  routePath,
  route,
  isCatalog,
  productId,
  cartCount,
  cartItems,
  cartOpen,
  setCartOpen,
  updateQuantity,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const handleNavigate = (event, destination) => {
    navigate(event, destination)
    setMenuOpen(false)
    setMobileSearchOpen(false)
  }

  return (
    <>
      <div className="topline">
        <span>Frete grátis para compras acima de R$ 299</span>
        <a href="/produtos" onClick={(event) => handleNavigate(event, '/produtos')}>
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
          <Logo navigate={handleNavigate} />
          <form className="search-form" role="search" onSubmit={(event) => {
            submitSearch(event)
            setMenuOpen(false)
            setMobileSearchOpen(false)
          }}>
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
                <img src={miniCart} alt="" aria-hidden="true" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
              {cartOpen && (
                <div className="cart-popover">
                  <div className="cart-popover-head">
                    <strong>Sua sacola</strong>
                    <button className="plain-icon" type="button" aria-label="Fechar sacola" onClick={() => setCartOpen(false)}>
                      <Icon name="close" size={18} />
                    </button>
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
                      <button className="button button-primary cart-checkout" type="button" onClick={() => setNotice('Checkout demonstrativo: sua sacola está pronta!')}>
                        Continuar compra
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegação principal">
          <a className={!isCatalog && !productId && routePath === '/' ? 'active' : ''} href="/" onClick={(event) => handleNavigate(event, '/')}>Home</a>
          <a className={isCatalog && route !== '/products?categoria=Todos' && route !== '/produtos?categoria=Todos' ? 'active' : ''} href="/products" onClick={(event) => handleNavigate(event, '/products')}>Produtos</a>
          <a className={route === '/products?categoria=Todos' || route === '/produtos?categoria=Todos' ? 'active' : ''} href="/products?categoria=Todos" onClick={(event) => handleNavigate(event, '/products?categoria=Todos')}>Categorias</a>
          <a href="/pedidos" onClick={(event) => {
            event.preventDefault()
            setNotice('Entre em contato para consultar seus pedidos.')
            setMenuOpen(false)
          }}>Meus Pedidos</a>
        </nav>
      </header>
    </>
  )
}
