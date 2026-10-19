import { formatPrice } from '../data/products'
import Icon from './Icon.jsx'

export default function ProductCard({ product, navigate, addToCart }) {
  const productPath = `/product/${product.id}`
  const hasOptions = product.sizes.length > 0 || product.colors.length > 0

  return (
    <article className="product-card">
      <a className="product-card-image" href={productPath} onClick={(event) => navigate(event, productPath)}>
        {product.badge && <span className={`product-badge ${product.discount ? '' : 'badge-dark'}`}>{product.badge}</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="quick-view">Ver produto <Icon name="arrow" size={16} /></span>
      </a>
      <div className="product-card-info">
        <span className="product-category">{product.category}</span>
        <a href={productPath} onClick={(event) => navigate(event, productPath)} className="product-name">{product.name}</a>
        <div className="product-card-rating" aria-label={`Avaliação ${product.rating.toFixed(1)} de 5`}>
          <span aria-hidden="true">★★★★★</span> {product.rating.toFixed(1)} <small>({product.reviews})</small>
        </div>
        <div className="card-price">
          {product.oldPrice > 0 && <del>{formatPrice(product.oldPrice)}</del>}
          <strong>{formatPrice(product.price)}</strong>
        </div>
        <span className="card-installment">ou 10x de {formatPrice(product.price / 10)} sem juros</span>
        {addToCart && (
          <button
            type="button"
            className="quick-add"
            onClick={() => hasOptions
              ? navigate(null, productPath)
              : addToCart(product)}
          >
            {hasOptions ? 'Escolher opções' : 'Adicionar à sacola'}
          </button>
        )}
      </div>
    </article>
  )
}
