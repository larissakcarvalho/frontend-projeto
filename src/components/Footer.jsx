import facebookIcon from '../../assets/facebook.svg'
import instagramIcon from '../../assets/instagram.svg'
import twitterIcon from '../../assets/twitter.svg'
import InformationList from './InformationList.jsx'
import Logo from './Logo.jsx'

const currentYear = new Date().getFullYear()

const institutionalInformation = [
  { text: 'Sobre nós', link: '#sobre' },
  { text: 'Política de privacidade', link: '#privacidade' },
  { text: 'Termos de uso', link: '#termos' },
]

const helpInformation = [
  { text: 'Entrega e frete', link: '#entrega' },
  { text: 'Trocas e devoluções', link: '#trocas' },
  { text: 'Fale conosco', link: '#contato' },
]

export default function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-main section-wrap">
        <div className="footer-brand">
          <Logo variant="footer" navigate={navigate} />
          <p>O seu próximo passo começa com escolhas que têm a sua cara.</p>
          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
            <a href="https://facebook.com" aria-label="Facebook"><img src={facebookIcon} alt="" /></a>
            <a href="https://twitter.com" aria-label="Twitter"><img src={twitterIcon} alt="" /></a>
          </div>
        </div>
        <InformationList title="Institucional" informations={institutionalInformation} />
        <InformationList title="Ajuda" informations={helpInformation} />
        <div className="footer-column footer-contact"><strong>Fale com a gente</strong><span>Seg a sex, das 9h às 18h</span><a href="mailto:oi@digitalstore.com.br">oi@digitalstore.com.br</a><span>(11) 4002-8922</span></div>
      </div>
      <div className="footer-bottom"><span>© {currentYear} Digital Store. Todos os direitos reservados.</span><span>Feito para acompanhar você.</span></div>
    </footer>
  )
}