import { formatPrice } from '../data/products'
import Icon from './Icon.jsx'
import ProductOptions from './ProductOptions.jsx'
import starIcon from '../../assets/star-icon.svg'

export default function BuyBox({
  product,
  selectedSize,
  selectedColor,
  quantity,
  sizeError,
  setSelectedSize,
  setSelectedColor,
  setQuantity,
  onAdd,
  setNotice,
}) {
  return (
    <div className="product-info">
      <span className="eyebrow">{product.category} / {product.type}</span>
      <h1>{product.name}</h1>
      <p className="product-sku">REF: DS-{product.id.slice(-6).toUpperCase()}</p>
      <div className="rating-line">
        <span className="rating-score"><span>{product.rating.toFixed(1)}</span><img src={starIcon} alt="" /></span>
        <span>({product.reviews} avaliações)</span>
      </div>
      <p className="detail-description">{product.description}</p>
      <div className="detail-price">
        {product.oldPrice > 0 && <del>{formatPrice(product.oldPrice)}</del>}
        <strong>{formatPrice(product.price)}</strong>
        {product.discount > 0 && <span>{product.discount}% OFF</span>}
      </div>
      <p className="installment-text">ou 10x de {formatPrice(product.price / 10)} sem juros</p>
      {product.sizes.length > 0 && (
        <>
          <ProductOptions
            title="Escolha o tamanho"
            options={product.sizes}
            value={selectedSize}
            onChange={setSelectedSize}
            error={sizeError ? 'Selecione um tamanho para continuar.' : ''}
            describedBy="product-size-error"
            action={(
              <button
                type="button"
                onClick={() => setNotice('Consulte o guia de tamanhos para encontrar seu ajuste ideal.')}
              >
                Guia de tamanhos
              </button>
            )}
          />
        </>
      )}
      {product.colors.length > 0 && (
        <ProductOptions
          title="Escolha a cor"
          options={product.colors}
          value={selectedColor}
          onChange={setSelectedColor}
          shape="circle"
          type="color"
        />
      )}
      <div className="add-actions">
        <div className="quantity-control detail-quantity">
          <button type="button" aria-label="Diminuir quantidade" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
          <span aria-live="polite">{quantity}</span>
          <button type="button" aria-label="Aumentar quantidade" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button type="button" className="button button-warning add-button" onClick={onAdd}>
          Adicionar à sacola <Icon name="cart" size={19} />
        </button>
      </div>
      <div className="shipping-info">
        <Icon name="truck" size={21} />
        <div><strong>Frete grátis acima de R$ 299</strong><span>Troca fácil em até 30 dias.</span></div>
      </div>
    </div>
  )
}
