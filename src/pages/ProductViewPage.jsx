import { useState } from 'react'
import { formatPrice, products } from '../data/products'
import BuyBox from '../components/BuyBox'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import ProductListing from '../components/ProductListing'
import ProductOptions from '../components/ProductOptions'
import Section from '../components/Section'

export default function ProductViewPage({ product, navigate, addToCart, setNotice }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const similarProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)
  const galleryImages = [
    { src: product.image, alt: `${product.name} — imagem completa`, className: 'gallery-image-full' },
    { src: product.image, alt: `${product.name} — detalhe aproximado`, className: 'gallery-image-detail' },
    { src: product.image, alt: `${product.name} — vista lateral`, className: 'gallery-image-side' },
  ]

  const handleBuy = () => {
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
          <Gallery
            images={galleryImages}
            width="700px"
            height="570px"
            radius="4px"
            showThumbs
            label={product.category}
          />
          <BuyBox
            name={product.name}
            reference={`DS-${product.id.slice(-6).toUpperCase()}`}
            stars={product.rating.toFixed(1)}
            rating={product.reviews}
            price={product.oldPrice || product.price}
            priceDiscount={product.oldPrice ? product.price : undefined}
            description={product.description}
            eyebrow={`${product.category} / ${product.type}`}
            onBuy={handleBuy}
          >
            <p className="installment-text">ou 10x de {formatPrice(product.price / 10)} sem juros</p>
            {product.sizes.length > 0 && (
              <div className="size-selector">
                <div className="size-title"><strong>Escolha o tamanho</strong><button type="button" onClick={() => setNotice('Consulte o guia de tamanhos para encontrar seu ajuste ideal.')}>Guia de tamanhos</button></div>
                <ProductOptions
                  options={product.sizes}
                  shape="square"
                  type="text"
                  radius="4px"
                  label="Tamanho"
                  value={selectedSize}
                  onChange={(size) => { setSelectedSize(size); setSizeError(false) }}
                />
                {sizeError && <p className="field-error" role="alert">Selecione um tamanho para continuar.</p>}
              </div>
            )}
            {product.colors.length > 0 && (
              <div className="size-selector color-selector">
                <div className="size-title"><strong>Escolha a cor</strong><span>{selectedColor}</span></div>
                <ProductOptions
                  options={product.colors}
                  shape="circle"
                  type="color"
                  label="Cor"
                  value={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>
            )}
            <div className="add-actions">
              <div className="quantity-control detail-quantity">
                <button type="button" aria-label="Diminuir quantidade" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button type="button" aria-label="Aumentar quantidade" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            <div className="shipping-info"><Icon name="truck" size={21} /><div><strong>Frete grátis acima de R$ 299</strong><span>Troca fácil em até 30 dias.</span></div></div>
          </BuyBox>
        </div>
      </section>
      {similarProducts.length > 0 && (
        <Section
          className="featured-section related-section"
          title="Produtos recomendados"
          eyebrow="VOCÊ TAMBÉM PODE GOSTAR"
          link={{ text: 'Ver todos', href: '/products' }}
          navigate={navigate}
        >
          <ProductListing products={similarProducts} navigate={navigate} />
        </Section>
      )}
    </>
  )
}
