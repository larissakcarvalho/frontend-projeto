import { useState } from 'react'
import { formatPrice, products } from '../data/products'
import Icon from '../components/Icon.jsx'
import ProductGrid from '../components/ProductGrid.jsx'

export default function ProductPage({ product, navigate, addToCart, setNotice }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const similarProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)
  const galleryImages = [
    { label: 'Imagem completa', className: 'gallery-image-full' },
    { label: 'Enquadramento à esquerda', className: 'gallery-image-detail' },
    { label: 'Enquadramento à direita', className: 'gallery-image-side' },
  ]

  const selectImage = (index) => {
    setActiveImage(Math.max(0, Math.min(galleryImages.length - 1, index)))
  }

  const handleAdd = () => {
    // Impede a inclusão de produtos com grade de tamanhos sem uma opção escolhida.
    if (product.sizes.length && !selectedSize) {
      setSizeError(true)
      return
    }
    addToCart(product, selectedSize, selectedColor, quantity)
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
          <div className="product-gallery" role="group" aria-label={`Galeria de imagens: ${product.name}`}>
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