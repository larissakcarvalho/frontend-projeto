export default function InformationList({ title, informations }) {
  return (
    <nav className="footer-column" aria-label={title}>
      <strong>{title}</strong>
      {informations.map((information) => (
        <a key={information.link} href={information.link}>{information.text}</a>
      ))}
    </nav>
  )
}
