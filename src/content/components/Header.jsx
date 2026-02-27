import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ siteName, oab, whatsapp }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRoute = (item) => {
    switch(item) {
      case 'Início': return '/';
      case 'Artigos': return '/blog';
      case 'Sobre': return '/sobre';
      case 'Contato': return '/contato';
      default: return '/';
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo - AUMENTADA */}
        <Link to="/" className="relative group">
          <h1 className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-primary' : 'text-white'
          }`}>
            {siteName}
          </h1>
          <p className={`text-sm md:text-base transition-colors duration-300 ${
            isScrolled ? 'text-gray-600' : 'text-white/80'
          }`}>{oab}</p>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Início', 'Artigos', 'Sobre', 'Contato'].map((item) => (
            <Link
              key={item}
              to={getRoute(item)}
              className={`relative font-medium transition-all duration-300 hover:text-accent group ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* WhatsApp Button - AUMENTADO */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg animate-pulse-slow"
        >
          <i className="fab fa-whatsapp text-xl"></i>
          <span>WhatsApp</span>
        </a>

        {/* Mobile Menu Button - HAMBURGUER PROFISSIONAL */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden relative w-10 h-10 focus:outline-none ${
            isScrolled ? 'text-primary' : 'text-white'
          }`}
          aria-label="Menu"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6">
            <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`}></span>
            <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu - PROFISSIONAL */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="container-custom py-6 flex flex-col space-y-3">
          {['Início', 'Artigos', 'Sobre', 'Contato'].map((item) => (
            <Link
              key={item}
              to={getRoute(item)}
              className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fab fa-whatsapp text-xl"></i>
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}