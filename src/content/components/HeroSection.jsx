import { Link } from 'react-router-dom';

export default function HeroSection({ title, subtitle, whatsapp, heroImage }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 mix-blend-multiply z-10"></div>
        <img
          src={heroImage || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
          alt="Escritório de Advocacia"
          className="w-full h-full object-cover animate-scaleIn"
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 text-white">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fadeInUp">
            {title || 'Excelência e Compromisso em Direito'}
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 animate-fadeInUp delay-200 max-w-2xl">
            {subtitle || 'Há mais de 12 anos defendendo seus direitos com ética, dedicação e soluções jurídicas eficientes.'}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fadeInUp delay-400">
            <Link
              to="/contato"
              className="group bg-accent text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 hover:shadow-xl"
            >
              Agende uma consulta
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
              </svg>
              Fale pelo WhatsApp
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex gap-8 mt-16 animate-fadeInUp delay-600">
            <div>
              <p className="text-3xl font-bold">12+</p>
              <p className="text-sm opacity-80">Anos de experiência</p>
            </div>
            <div>
              <p className="text-3xl font-bold">350+</p>
              <p className="text-sm opacity-80">Casos resolvidos</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm opacity-80">Clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
    </section>
  );
}