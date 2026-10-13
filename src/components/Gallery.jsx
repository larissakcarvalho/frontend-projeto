import { useState } from 'react'

export default function Gallery({
  images,
  className = '',
  width,
  height,
  radius = '4px',
  showThumbs = false,
  label,
  activeIndex: controlledIndex,
  onChange,
}) {
  const [internalIndex, setInternalIndex] = useState(0)
  const activeIndex = controlledIndex ?? internalIndex

  if (!images.length) {
    return <div className={`product-gallery ${className}`.trim()} role="img" aria-label="Nenhuma imagem disponível" />
  }

  const normalizedIndex = Math.max(0, Math.min(images.length - 1, activeIndex))
  const activeImage = images[normalizedIndex]
  const selectImage = (index) => {
    const nextIndex = Math.max(0, Math.min(images.length - 1, index))
    if (controlledIndex === undefined) setInternalIndex(nextIndex)
    onChange?.(nextIndex)
  }

  return (
    <div className={`product-gallery ${className}`.trim()} style={{ width, maxWidth: '100%' }}>
      <div className="product-main-image" style={{ height, borderRadius: radius }}>
        {label && <span className="product-image-label">{label}</span>}
        <img
          className={activeImage.className || ''}
          src={activeImage.src}
          alt={activeImage.alt || `Imagem ${activeIndex + 1}`}
          style={{ borderRadius: radius }}
        />
        <button
          type="button"
          className="gallery-arrow gallery-arrow-previous"
          aria-label="Imagem anterior"
          disabled={normalizedIndex === 0}
          onClick={() => selectImage(normalizedIndex - 1)}
        >‹</button>
        <button
          type="button"
          className="gallery-arrow gallery-arrow-next"
          aria-label="Próxima imagem"
          disabled={normalizedIndex === images.length - 1}
          onClick={() => selectImage(normalizedIndex + 1)}
        >›</button>
      </div>
      {showThumbs && (
        <div className="gallery-thumbnails" aria-label="Miniaturas do produto">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={`thumbnail${normalizedIndex === index ? ' active' : ''}`}
              aria-label={`Exibir imagem ${index + 1}`}
              aria-pressed={normalizedIndex === index}
              onClick={() => selectImage(index)}
              style={{ borderRadius: radius }}
            >
              <img className={image.className || ''} src={image.src} alt="" style={{ borderRadius: radius }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
