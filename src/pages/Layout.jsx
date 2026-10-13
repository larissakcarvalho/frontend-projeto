export default function Layout({ header, children, footer }) {
  return (
    <div className="store">
      {header}
      <main>{children}</main>
      {footer}
    </div>
  )
}
