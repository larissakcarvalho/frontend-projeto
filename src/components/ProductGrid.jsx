import { formatPrice } from '../data/products'
import Icon from './Icon.jsx'

export default function ProductGrid({ products: items, navigate, addToCart }) {
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