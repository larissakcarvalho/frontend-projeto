import { useState } from 'react'
import { products } from '../data/products'
import BuyBox from '../components/BuyBox.jsx'
import Gallery from '../components/Gallery.jsx'
import Icon from '../components/Icon.jsx'
import ProductListing from '../components/ProductListing.jsx'
import Section from '../components/Section.jsx'

export default function ProductPage({ product, navigate, addToCart, setNotice }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const similarProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)
  const galleryImages = (product.images?.length ? product.images : [product.image])
    .map((image, index) => ({
      src: image,
      alt: `${product.name} — imagem ${index + 1}`,
    }))

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
          <Gallery
            images={galleryImages}
            activeIndex={activeImage}
            onChange={selectImage}
            ariaLabel={`Galeria de imagens: ${product.name}`}
            className="product-gallery"
            imageContainerClassName="product-main-image"
            controlsClassName="product-gallery-controls"
            showThumbnails
          >
            <span className="product-image-label">{product.category}</span>
          </Gallery>
          <BuyBox
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity}
            sizeError={sizeError}
            setSelectedSize={(size) => {
              setSelectedSize(size)
              setSizeError(false)
            }}
            setSelectedColor={setSelectedColor}
            setQuantity={setQuantity}
            onAdd={handleAdd}
            setNotice={setNotice}
          />
        </div>
      </section>
      {similarProducts.length > 0 && (
        <Section
          title="Produtos recomendados"
          eyebrow="VOCÊ TAMBÉM PODE GOSTAR"
          className="featured-section related-section"
          link={{ text: 'Ver todos', href: '/products' }}
          navigate={navigate}
        >
          <ProductListing products={similarProducts} navigate={navigate} />
        </Section>
      )}
    </>
  )
}