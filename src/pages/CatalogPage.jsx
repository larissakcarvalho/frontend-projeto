import { useMemo, useState } from 'react'
import { categories } from '../data/products'
import FilterGroup from '../components/FilterGroup.jsx'
import Icon from '../components/Icon.jsx'
import ProductListing from '../components/ProductListing.jsx'
import Section from '../components/Section.jsx'

const priceOptions = [
  { label: 'Até R$ 200', value: '0-200', min: 0, max: 200 },
  { label: 'R$ 200 a R$ 400', value: '200-400', min: 200, max: 400, minExclusive: true },
  { label: 'Acima de R$ 400', value: '400+', min: 400, max: Infinity, minExclusive: true },
]

export default function CatalogPage({ products, selectedCategory, searchTerm, navigate, collectionLink }) {
  const [sortBy, setSortBy] = useState('relevance')
  const [mobileFilters, setMobileFilters] = useState(false)
  const [priceRanges, setPriceRanges] = useState([])
  const filteredProducts = useMemo(() => {
    // Remove acentos para que a busca aceite, por exemplo, "tenis" e "tênis".
    const normalizeText = (value) =>
      value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const normalizedSearch = normalizeText(searchTerm)
    const matching = products.filter((product) => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory || product.type === selectedCategory
      const matchesSearch = !normalizedSearch || normalizeText(`${product.name} ${product.category} ${product.type}`).includes(normalizedSearch)
      const matchesPrice = priceRanges.length === 0 || priceRanges.some((range) => {
        const option = priceOptions.find((priceOption) => priceOption.value === range)
        const aboveMinimum = option?.minExclusive
          ? product.price > option.min
          : option && product.price >= option.min
        return Boolean(option && aboveMinimum && product.price <= option.max)
      })
      return matchesCategory && matchesSearch && matchesPrice
    })
    if (sortBy === 'price-low') return [...matching].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') return [...matching].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') return [...matching].sort((a, b) => b.rating - a.rating)
    return matching
  }, [products, selectedCategory, searchTerm, sortBy, priceRanges])

  const togglePriceRange = (range) => {
    setPriceRanges((selected) =>
      selected.includes(range)
        ? selected.filter((item) => item !== range)
        : [...selected, range],
    )
  }

  const heading = searchTerm
    ? `Resultados para “${searchTerm}”`
    : selectedCategory === 'Todos'
      ? 'Todos os produtos'
      : selectedCategory

  return (
    <section className="catalog-page section-wrap">
      <div className="breadcrumbs">
        <a href="/" onClick={(event) => navigate(event, '/')}>Home</a><Icon name="chevron" size={14} /><span>Produtos</span>
        {selectedCategory !== 'Todos' && <><Icon name="chevron" size={14} /><span>{selectedCategory}</span></>}
      </div>
      <div className="catalog-heading">
        <div><span className="eyebrow">ENCONTRE O SEU PRÓXIMO FAVORITO</span><h1>{heading}</h1></div>
      </div>
      <div className="catalog-toolbar">
        <button
          type="button"
          className="filter-toggle"
          aria-expanded={mobileFilters}
          aria-controls="catalog-filters"
          onClick={() => setMobileFilters(!mobileFilters)}
        >
          <Icon name="menu" size={18} /> Categorias
        </button>
        <label className="sort-control mobile-sort-control">
          <span>Ordenar por</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Ordenar produtos">
            <option value="relevance">Mais relevantes</option>
            <option value="price-low">Menor preço</option>
            <option value="price-high">Maior preço</option>
            <option value="rating">Melhor avaliação</option>
          </select>
        </label>
      </div>
      <div className="catalog-layout">
        <aside id="catalog-filters" className={`category-sidebar ${mobileFilters ? 'filters-open' : ''}`}>
          <label className="sort-control">
            <span>Ordenar por</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Ordenar produtos">
              <option value="relevance">Mais relevantes</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
              <option value="rating">Melhor avaliação</option>
            </select>
          </label>
          <h2>Filtrar por</h2>
          <FilterGroup
            title="Categoria"
            inputType="radio"
            name="product-category"
            options={categories.map((category) => ({
              text: category,
              value: category,
              count: category === 'Todos'
                ? products.length
                : products.filter((product) => product.category === category || product.type === category).length,
            }))}
            selectedValues={[selectedCategory]}
            onChange={(category) => {
              setMobileFilters(false)
              navigate(null, collectionLink(category))
            }}
          />
          <FilterGroup
            title="Preço"
            options={priceOptions.map(({ label, value }) => ({ text: label, value }))}
            selectedValues={priceRanges}
            onChange={togglePriceRange}
            className="price-filter-group"
          />
          <div className="filter-note"><span>Precisa de ajuda?</span><p>Escolha por categoria e encontre o que combina com você.</p></div>
        </aside>
        <Section
          title={`${filteredProducts.length} produtos encontrados`}
          titleAlign="left"
          className="catalog-results"
        >
          {filteredProducts.length ? (
            <ProductListing products={filteredProducts} navigate={navigate} />
          ) : (
            <div className="no-results">
              <span className="eyebrow">NÃO ENCONTRAMOS</span>
              <h2>Nenhum produto por aqui.</h2>
              <p>Tente buscar por outro nome ou veja todos os produtos.</p>
              <a className="button button-primary" href="/produtos" onClick={(event) => navigate(event, '/produtos')}>Ver todos os produtos</a>
            </div>
          )}
        </Section>
      </div>
    </section>
  )
}