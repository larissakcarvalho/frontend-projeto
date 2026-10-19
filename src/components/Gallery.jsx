export default function Gallery({
  images,
  activeIndex,
  onChange,
  ariaLabel,
  className = '',
  imageContainerClassName = '',
  controlsClassName,
  showThumbnails = false,
  showIndicators = false,
  children,
}) {
  const hasMultipleImages = images.length > 1
  const activeImage = images[activeIndex]

  return (
    <div className={className} role="group" aria-label={ariaLabel}>
      <div className={imageContainerClassName}>
        <img src={activeImage.src} alt={activeImage.alt} />
        {children}
        {hasMultipleImages && (
          <div className={controlsClassName}>
            <button
              type="button"
              className={showThumbnails ? 'gallery-arrow gallery-arrow-previous' : undefined}
              aria-label="Imagem anterior"
              disabled={activeIndex === 0}
              onClick={() => onChange(activeIndex - 1)}
            >‹</button>
            <button
              type="button"
              className={showThumbnails ? 'gallery-arrow gallery-arrow-next' : undefined}
              aria-label="Próxima imagem"
              disabled={activeIndex === images.length - 1}
              onClick={() => onChange(activeIndex + 1)}
            >›</button>
          </div>
        )}
      </div>
      {showThumbnails && hasMultipleImages && (
        <div className="gallery-thumbnails" aria-label="Miniaturas do produto">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`thumbnail ${activeIndex === index ? 'active' : ''}`}
              aria-label={`Exibir imagem ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => onChange(index)}
            >
              <img src={image.src} alt="" />
            </button>
          ))}
        </div>
      )}
      {showIndicators && (
        <div className="hero-dots" aria-label="Selecionar destaque da coleção">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={activeIndex === index ? 'selected' : ''}
              aria-label={`Exibir: ${image.alt}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => onChange(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
