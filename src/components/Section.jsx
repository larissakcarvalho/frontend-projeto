import Icon from './Icon.jsx'

export default function Section({
  title,
  titleAlign = 'left',
  eyebrow,
  link,
  navigate,
  className = '',
  headingContent,
  children,
}) {
  const sectionClassName = ['section-wrap', className].filter(Boolean).join(' ')
  const headingClassName = `section-heading${titleAlign === 'center' ? ' category-heading' : ''}`

  return (
    <section className={sectionClassName}>
      <div className={headingClassName}>
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {headingContent}
        </div>
        {link && (
          <a
            className="text-link"
            href={link.href}
            onClick={navigate ? (event) => navigate(event, link.href) : undefined}
          >
            {link.text} <Icon name="arrow" size={17} />
          </a>
        )}
      </div>
      {children}
    </section>
  )
}
