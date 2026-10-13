import { formatPrice } from '../data/products'

export default function ProductCard({
  product: catalogProduct,
  image,
  name,
  price,
  priceDiscount,
  navigate,
  addToCart,
}) {
  const product = catalogProduct || {
    image,
    name,
    price: priceDiscount ?? price,
    oldPrice: priceDiscount == null ? 0 : price,
    rating: null,
    reviews: null,
    sizes: [],
    colors: [],
  }
  const productPath = product.id ? `/product/${product.id}` : null
  const openProduct = (event) => productPath && navigate?.(event, productPath)
  const imageContent = (
    <>
      {product.badge && <span className={`product-badge${product.discount ? '' : ' badge-dark'}`}>{product.badge}</span>}
      <img src={product.image} alt={product.name} loading="lazy" />
      <span className="quick-view">Ver produto</span>
    </>
  )

  return (
    <article className="product-card">
      {productPath
        ? <a className="product-card-image" href={productPath} onClick={openProduct}>{imageContent}</a>
        : <div className="product-card-image">{imageContent}</div>}
      <div className="product-card-info">
        <span className="product-category">{product.category}</span>
        {productPath
          ? <a href={productPath} onClick={openProduct} className="product-name">{product.name}</a>
          : <span className="product-name">{product.name}</span>}
        {product.rating != null && <div className="product-card-rating"><span>★★★★★</span> {product.rating.toFixed(1)} <small>({product.reviews})</small></div>}
        <div className="card-price">
          {product.oldPrice > 0 && <del>{formatPrice(product.oldPrice)}</del>}
          <strong>{formatPrice(product.price)}</strong>
        </div>
        {product.rating != null && <span className="card-installment">ou 10x de {formatPrice(product.price / 10)} sem juros</span>}
        {addToCart && (
          <button
            type="button"
            className="quick-add"
            onClick={() => productPath && (product.sizes.length || product.colors.length)
              ? navigate(null, productPath)
              : addToCart(product)}
          >
            {productPath && (product.sizes.length || product.colors.length) ? 'Escolher opções' : 'Adicionar à sacola'}
          </button>
        )}
      </div>
    </article>
  )
}
