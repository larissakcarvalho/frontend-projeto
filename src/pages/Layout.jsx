export default function Layout({ header, children, footer, notice, overlayOpen, onDismissOverlay }) {
  return (
    <div className="store">
      {header}
      <main>{children}</main>
      {footer}
      {notice && <div className="toast" role="status">{notice}</div>}
      {overlayOpen && (
        <button
          type="button"
          className="popover-dismiss"
          aria-label="Fechar sacola"
          onClick={onDismissOverlay}
        />
      )}
    </div>
  )
}
