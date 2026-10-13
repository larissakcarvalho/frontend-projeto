import { useState } from 'react'
import { products } from '../data/products'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import { Benefit, CategoryTile, NewsletterForm } from '../components/HomeWidgets'
import ProductListing from '../components/ProductListing'
import Section from '../components/Section'

export default function HomePage({ navigate, collectionLink, addToCart }) {
  const [heroSlide, setHeroSlide] = useState(0)
  const heroProduct = products[heroSlide]
  const heroImages = products.map((product) => ({
    src: product.image,
    alt: product.name,
  }))

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
          <Gallery
            className="hero-carousel"
            images={heroImages}
            width="100%"
            height="100%"
            activeIndex={heroSlide}
            onChange={setHeroSlide}
          />
          <div className="hero-product-tag"><span>{heroProduct.name.toUpperCase()}</span><strong>Do seu jeito.</strong></div>
          <span className="hero-number">0{heroSlide + 1}</span>
        </div>
        <div className="hero-dots" aria-label="Selecionar produto em destaque">
          {products.map((product, index) => (
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

      <Section
        className="categories-section"
        title="Coleções em destaque"
        titleAlign="center"
        eyebrow="ESCOLHA O SEU ESTILO"
        link={{ text: 'Ver todas', href: '/produtos' }}
        navigate={navigate}
      >
        <div className="category-grid">
          <CategoryTile title="Tênis" note="Para ir mais longe" image={products[1].image} href={collectionLink('Tênis')} navigate={navigate} />
          <CategoryTile title="Casual" note="Conforto sem esforço" image={products[5].image} href={collectionLink('Casual')} navigate={navigate} />
          <CategoryTile title="Acessórios" note="Detalhes que fazem" image={products[6].image} href={collectionLink('Acessórios')} navigate={navigate} />
        </div>
      </Section>

      <Section
        className="featured-section"
        title="Produtos em alta"
        eyebrow="SELEÇÃO DA SEMANA"
        link={{ text: 'Ver coleção completa', href: '/produtos' }}
        navigate={navigate}
      >
        <ProductListing products={products} navigate={navigate} addToCart={addToCart} />
      </Section>

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
