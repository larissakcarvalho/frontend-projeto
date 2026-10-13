import { useState } from 'react'
import Icon from './Icon'

export function Benefit({ icon, title, text }) {
  return <div className="benefit"><span className="benefit-icon"><Icon name={icon} size={22} /></span><div><strong>{title}</strong><span>{text}</span></div></div>
}

export function CategoryTile({ title, note, image, href, navigate }) {
  return (
    <a className="category-tile" href={href} onClick={(event) => navigate(event, href)}>
      <img src={image} alt="" loading="lazy" />
      <span className="category-tile-overlay" />
      <span className="category-tile-copy"><small>{note}</small><strong>{title}</strong><span className="category-arrow"><Icon name="arrow" size={17} /></span></span>
    </a>
  )
}

export function NewsletterForm() {
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
