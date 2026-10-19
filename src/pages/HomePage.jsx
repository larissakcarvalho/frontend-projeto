import { useState } from 'react'
import { products } from '../data/products'
import Icon from '../components/Icon.jsx'
import ProductGrid from '../components/ProductGrid.jsx'

export default function HomePage({ navigate, collectionLink, addToCart }) {
  const featured = products
  const [heroSlide, setHeroSlide] = useState(0)
  const heroProduct = featured[heroSlide]

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">ESTILO QUE ACOMPANHA VOCÊ</span>
          <h1>Seu próximo<br /><span>passo começa aqui.</span></h1>
          <p>Encontre o equilíbrio perfeito entre conforto, atitude e o seu jeito de viver.</p>
          <a className="button button-primary" href="/produtos" onClick={(event) => navigate(event, '/produtos')}>
            Explorar coleção <Icon name="arrow" size={18} />
          </a>
          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true"><span>J</span><span>M</span><span>A</span></div>
            <span><strong>+2.000 pessoas</strong><br />já encontraram seu estilo</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Tênis esportivo em destaque">
          <div className="hero-circle" />
          <span className="hero-caption">NOVA COLEÇÃO<br /><strong>SPRING / 26</strong></span>
          <img src={heroProduct.image} alt={heroProduct.name} />
          <div className="hero-product-tag"><span>{heroProduct.name.toUpperCase()}</span><strong>Do seu jeito.</strong></div>
          <span className="hero-number">0{heroSlide + 1}</span>
          <div className="hero-gallery-controls" aria-label="Controles do destaque">
            <button type="button" aria-label="Produto em destaque anterior" disabled={heroSlide === 0} onClick={() => setHeroSlide(heroSlide - 1)}>‹</button>
            <button type="button" aria-label="Próximo produto em destaque" disabled={heroSlide === featured.length - 1} onClick={() => setHeroSlide(heroSlide + 1)}>›</button>
          </div>
        </div>
        <div className="hero-dots" aria-label="Selecionar produto em destaque">
          {featured.map((product, index) => (
            <button
              key={product.id}
              type="button"
              className={heroSlide === index ? 'selected' : ''}
              aria-label={`Exibir ${product.name}`}
              aria-current={heroSlide === index ? 'true' : undefined}
              onClick={() => setHeroSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="benefits-strip" aria-label="Benefícios da loja">
        <Benefit icon="truck" title="Frete grátis" text="Acima de R$ 299" />
        <Benefit icon="return" title="Troca fácil" text="Até 30 dias" />
        <Benefit icon="plus" title="Parcele em até 10x" text="Sem juros no cartão" />
      </section>

      <section className="categories-section section-wrap">
        <div className="section-heading category-heading">
          <div><span className="eyebrow">ESCOLHA O SEU ESTILO</span><h2>Coleções em destaque</h2></div>
          <a className="text-link" href="/produtos" onClick={(event) => navigate(event, '/produtos')}>Ver todas <Icon name="arrow" size={17} /></a>
        </div>
        <div className="category-grid">
          <CategoryTile title="Camisetas" note="Novos lançamentos" image="/collection-1.png" href={collectionLink('Camisetas')} navigate={navigate} />
          <CategoryTile title="Tênis" note="Coleção em destaque" image="/collection-2.png" href={collectionLink('Tênis')} navigate={navigate} />
          <CategoryTile title="Acessórios" note="Complete seu estilo" image="/collection-3.png" href={collectionLink('Acessórios')} navigate={navigate} />
        </div>
      </section>

      <section className="featured-section section-wrap">
        <div className="section-heading">
          <div><span className="eyebrow">SELEÇÃO DA SEMANA</span><h2>Produtos em alta</h2></div>
          <a className="text-link" href="/produtos" onClick={(event) => navigate(event, '/produtos')}>Ver coleção completa <Icon name="arrow" size={17} /></a>
        </div>
        <ProductGrid products={featured} navigate={navigate} addToCart={addToCart} />
      </section>

      <section className="promo-banner section-wrap">
        <div className="promo-content">
          <span className="eyebrow">SEU ESTILO, SEU MOMENTO</span>
          <h2>Um clássico.<br />Mil possibilidades.</h2>
          <p>Conheça peças que fazem parte da sua história — todos os dias.</p>
          <a className="button button-light" href={collectionLink('Casual')} onClick={(event) => navigate(event, collectionLink('Casual'))}>Descobrir agora <Icon name="arrow" size={17} /></a>
        </div>
        <div className="promo-image">
          <img src={products[2].image} alt="Tênis casual branco em fundo neutro" />
          <span>FEITO PARA<br />O SEU CAMINHO</span>
        </div>
      </section>

      <section className="newsletter-section">
        <div>
          <span className="eyebrow">FICA A DICA</span>
          <h2>Novidades boas chegam por e-mail.</h2>
          <p>Cadastre-se e receba novidades, lançamentos e condições especiais.</p>
        </div>
        <NewsletterForm />
      </section>
    </>
  )
}

function Benefit({ icon, title, text }) {
  return <div className="benefit"><span className="benefit-icon"><Icon name={icon} size={22} /></span><div><strong>{title}</strong><span>{text}</span></div></div>
}

function CategoryTile({ title, note, image, href, navigate }) {
  return (
    <a className="category-tile" href={href} onClick={(event) => navigate(event, href)}>
      <img src={image} alt="" loading="lazy" />
      <span className="category-tile-overlay" />
      <span className="category-tile-copy"><small>{note}</small><strong>{title}</strong><span className="category-arrow"><Icon name="arrow" size={17} /></span></span>
    </a>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      {submitted ? (
        <p className="newsletter-success" role="status">Pronto! Você receberá nossas novidades em breve.</p>
      ) : (
        <>
          <label className="visually-hidden" htmlFor="newsletter-email">Seu melhor e-mail</label>
          <input id="newsletter-email" type="email" placeholder="Seu melhor e-mail" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <button className="button button-primary" type="submit">Quero receber <Icon name="arrow" size={17} /></button>
        </>
      )}
    </form>
  )
}