import { useState } from 'react'
import arrowLeft from '../../assets/arrow-left.svg'
import arrowRight from '../../assets/arrow-right.svg'

export default function Gallery({
  images,
  activeIndex,
  onChange,
  ariaLabel,
  className = '',
  imageContainerClassName = '',
  controlsClassName,
  showThumbnails = false,
  showThumbs,
  showIndicators = false,
  width,
  height,
  radius = '4px',
  children,
}) {
  const [slideDirection, setSlideDirection] = useState('next')
  const hasMultipleImages = images.length > 1
  const activeImage = images[activeIndex]
  const thumbnailsVisible = showThumbs ?? showThumbnails
  const toCssLength = (value) => typeof value === 'number' ? `${value}px` : value
  const selectImage = (index) => {
    setSlideDirection(index >= activeIndex ? 'next' : 'previous')
    onChange(index)
  }

  return (
    <div
      className={className}
      role="group"
      aria-label={ariaLabel}
      style={width ? { width: toCssLength(width) } : undefined}
    >
      <div className={imageContainerClassName} style={height ? { height: toCssLength(height) } : undefined}>
        <img
          key={activeIndex}
          className={`gallery-slide gallery-slide-${slideDirection}`}
          src={activeImage.src}
          alt={activeImage.alt}
          style={{ borderRadius: radius }}
        />
        {children}
        {hasMultipleImages && (
          <div className={controlsClassName}>
            <button
              type="button"
              className={thumbnailsVisible ? 'gallery-arrow gallery-arrow-previous' : undefined}
              aria-label="Imagem anterior"
              disabled={activeIndex === 0}
              onClick={() => selectImage(activeIndex - 1)}
            ><img src={arrowLeft} alt="" /></button>
            <button
              type="button"
              className={thumbnailsVisible ? 'gallery-arrow gallery-arrow-next' : undefined}
              aria-label="Próxima imagem"
              disabled={activeIndex === images.length - 1}
              onClick={() => selectImage(activeIndex + 1)}
            ><img src={arrowRight} alt="" /></button>
          </div>
        )}
      </div>
      {thumbnailsVisible && hasMultipleImages && (
        <div className="gallery-thumbnails" aria-label="Miniaturas do produto">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`thumbnail ${activeIndex === index ? 'active' : ''}`}
              aria-label={`Exibir imagem ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => selectImage(index)}
            >
              <img src={image.src} alt="" style={{ borderRadius: radius }} />
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
              onClick={() => selectImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
