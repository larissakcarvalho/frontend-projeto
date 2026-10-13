export default function Information({ title, informations }) {
  return (
    <div className="footer-column">
      <strong>{title}</strong>
      {informations.map((information) => (
        <a key={`${information.text}-${information.link}`} href={information.link}>{information.text}</a>
      ))}
    </div>
  )
}
