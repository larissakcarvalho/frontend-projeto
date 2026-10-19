const currentYear = new Date().getFullYear()

export default function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-main section-wrap">
        <div className="footer-brand">
          <a className="wordmark footer-wordmark" href="/" onClick={(event) => navigate(event, '/')}>
            <span className="brand-symbol">D</span><span>digital<span className="wordmark-accent">store</span><small>.</small></span>
          </a>
          <p>O seu próximo passo começa com escolhas que têm a sua cara.</p>
          <div className="social-links"><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://tiktok.com" aria-label="TikTok">tk</a></div>
        </div>
        <div className="footer-column"><strong>Institucional</strong><a href="#sobre">Sobre nós</a><a href="#privacidade">Política de privacidade</a><a href="#termos">Termos de uso</a></div>
        <div className="footer-column"><strong>Ajuda</strong><a href="#entrega">Entrega e frete</a><a href="#trocas">Trocas e devoluções</a><a href="#contato">Fale conosco</a></div>
        <div className="footer-column footer-contact"><strong>Fale com a gente</strong><span>Seg a sex, das 9h às 18h</span><a href="mailto:oi@digitalstore.com.br">oi@digitalstore.com.br</a><span>(11) 4002-8922</span></div>
      </div>
      <div className="footer-bottom"><span>© {currentYear} Digital Store. Todos os direitos reservados.</span><span>Feito para acompanhar você.</span></div>
    </footer>
  )
}