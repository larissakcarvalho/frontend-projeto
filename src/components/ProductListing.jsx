import ProductCard from './ProductCard'

export default function ProductListing({ products, navigate, addToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id || product.name} product={product} navigate={navigate} addToCart={addToCart} />
      ))}
    </div>
  )
}
