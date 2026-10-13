import darkLogo from '../assets/logo.svg'
import whiteLogo from '../assets/logo-white.svg'

export default function Logo({ light = false, onClick }) {
  return (
    <a className={`wordmark${light ? ' footer-wordmark' : ''}`} href="/" aria-label="Digital Store — página inicial" onClick={onClick}>
      <img src={light ? whiteLogo : darkLogo} alt="Digital Store" width="253" height="44" />
    </a>
  )
}
