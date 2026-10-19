import logoFooter from '../../assets/logo-footer.svg'
import logoHeader from '../../assets/logo-header.svg'

export default function Logo({ variant = 'header', navigate }) {
  const logo = variant === 'footer' ? logoFooter : logoHeader
  const className = variant === 'footer' ? 'wordmark footer-wordmark' : 'wordmark'

  return (
    <a className={className} href="/" onClick={(event) => navigate(event, '/')}>
      <img src={logo} alt="Digital Store" />
    </a>
  )
}
