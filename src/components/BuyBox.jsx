import { formatPrice } from '../data/products'

export default function BuyBox({
  name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  eyebrow,
  children,
  onBuy,
}) {
  return (
    <div className="product-info">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{name}</h1>
      <p className="product-sku">REF: {reference}</p>
      <div className="rating-line">
        <span className="rating-score"><strong>{stars}</strong><span aria-hidden="true">★</span></span>
        <span>({rating} avaliações)</span>
      </div>
      <p className="detail-description">{description}</p>
      <div className="detail-price">
        {priceDiscount != null && <del>{formatPrice(price)}</del>}
        <strong>{formatPrice(priceDiscount ?? price)}</strong>
      </div>
      {children}
      <button type="button" className="button buy-box-button add-button" onClick={onBuy}>COMPRAR</button>
    </div>
  )
}
