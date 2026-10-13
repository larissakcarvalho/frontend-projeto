export default function Section({ title, titleAlign = 'left', eyebrow, link, navigate, className = '', children }) {
  return (
    <section className={`section-wrap ${className}`.trim()}>
      <div className={`section-heading${titleAlign === 'center' ? ' category-heading' : ''}`}>
        <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>
        {link && <a className="text-link" href={link.href} onClick={(event) => navigate?.(event, link.href)}>{link.text}</a>}
      </div>
      {children}
    </section>
  )
}
