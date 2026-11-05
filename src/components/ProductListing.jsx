import ProductCard from './ProductCard.jsx'

export default function ProductListing({ products, navigate, addToCart, className = 'product-grid' }) {
  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          navigate={navigate}
          addToCart={addToCart}
        />
      ))}
    </div>
  )
}
