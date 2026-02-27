import { Link } from 'react-router-dom';

export default function Footer({ siteName, oab, phone, email, address, whatsapp }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1A33] text-white border-t border-white/10">
      {/* Main Footer */}
      <div className="container-custom py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Coluna 1 - Sobre */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                {siteName}
              </h3>
              <p className="text-sm text-white/60 font-light tracking-wide">
                {oab}
              </p>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Excelência e compromisso com seus direitos há mais de 12 anos. 
              Atuação nas áreas Cível, Trabalhista e Criminal com ética, 
              dedicação e atenção personalizada a cada cliente.
            </p>

            {/* Selo de confiança */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                <span className="text-accent text-lg">⚖️</span>
              </div>
              <div>
                <p className="text-xs text-white/40">Confiança e</p>
                <p className="text-sm text-white/80">Tradição desde 2012</p>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-accent tracking-[0.2em] uppercase">
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Início', path: '/' },
                { name: 'Artigos', path: '/blog' },
                { name: 'Sobre', path: '/sobre' },
                { name: 'Contato', path: '/contato' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-white/70 hover:text-accent transition-colors"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Links institucionais */}
            <div className="pt-4 space-y-2">
              <a href="#" className="block text-xs text-white/40 hover:text-white/60 transition">
                Política de Privacidade
              </a>
              <a href="#" className="block text-xs text-white/40 hover:text-white/60 transition">
                Termos de Uso
              </a>
            </div>
          </div>

          {/* Coluna 3 - Contato */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-accent tracking-[0.2em] uppercase">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">📍</span>
                <div>
                  <p className="text-xs text-white/40 mb-1">Endereço</p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {address}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">📞</span>
                <div>
                  <p className="text-xs text-white/40 mb-1">Telefone / WhatsApp</p>
                  <a
                    href={`tel:${phone}`}
                    className="text-white/80 text-sm hover:text-accent transition block"
                  >
                    {phone}
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 text-sm hover:text-accent transition block mt-1"
                  >
                    WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✉️</span>
                <div>
                  <p className="text-xs text-white/40 mb-1">E-mail</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-white/80 text-sm hover:text-accent transition"
                  >
                    {email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Horário e Redes */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-accent tracking-[0.2em] uppercase">
              Atendimento
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/80">
                <span>Segunda a Sexta</span>
                <span className="text-white/60">9h às 18h</span>
              </div>
              <div className="flex justify-between text-sm text-white/80">
                <span>Sábado e Domingo</span>
                <span className="text-white/60">Fechado</span>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="pt-6">
              <h5 className="text-xs text-white/40 mb-3 tracking-wider">SIGA-NOS</h5>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary transition-all"
                  aria-label="Instagram"
                >
                  <span className="text-xl">📷</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary transition-all"
                  aria-label="LinkedIn"
                >
                  <span className="text-xl">💼</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary transition-all"
                  aria-label="Facebook"
                >
                  <span className="text-xl">f</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Direitos autorais */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} {siteName}. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/20">
              OAB/SP {oab.replace('OAB/SP ', '')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}