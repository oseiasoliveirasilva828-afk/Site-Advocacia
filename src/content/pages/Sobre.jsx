import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import LoadingScreen from '../components/LoadingScreen'; // ← IMPORT ADICIONADO!
import { loadContent } from '/src/utils/contentLoader';
import '../styles/animations.css';

export default function Sobre() {
  const [content, setContent] = useState({
    siteName: "Edson Silva Maltez",
    oab: "OAB/SP 344.956",
    phone: "(19) 99631-9810",
    whatsapp: "5519996319810",
    email: "dredsonmaltez@gmail.com",
    address: "Rua Francisco Biancalana, 31 - sala 02 - Vila Santana, Sumaré - SP",
    
    // Informações do advogado
    lawyerName: "Edson Silva Maltez",
    lawyerFullName: "Edson Silva Maltez",
    lawyerAge: 42,
    lawyerCity: "Diadema",
    lawyerEducation: "Pontifícia Universidade Católica de Campinas (PUC-Campinas)",
    lawyerGraduation: "Bacharel em Direito",
    lawyerGraduationYear: 2010,
    lawyerOabYear: 2014,
    lawyerExperience: 12,
    lawyerCases: 350,
    
    // Biografia
    lawyerBio: "Natural de Diadema, Edson Silva Maltez construiu uma trajetória sólida na advocacia, marcada pela dedicação e pelo compromisso com a justiça. Formado pela Pontifícia Universidade Católica de Campinas (PUC-Campinas), atua há 12 anos nas áreas de Direito Civil, Trabalhista e Criminal, oferecendo consultoria, assessoria e defesa técnica com ética e atenção personalizada.",
    
    // Citações
    quote: "A justiça não é apenas uma profissão, é um compromisso com a verdade e com o próximo.",
    
    // Estatísticas
    stats: {
      casesWon: 87,
      clientsSatisfied: 98,
      yearsExperience: 12
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await loadContent('/src/content/settings/general.md');
        setContent(prev => ({ ...prev, ...settingsData?.data }));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Pequeno delay para mostrar o loading
      }
    }
    loadData();
  }, []);

  // Usando o mesmo LoadingScreen dos outros componentes!
  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
      
      {/* Hero da página Sobre */}
      <section className="pt-40 pb-20 md:pt-44 md:pb-24 lg:pt-48 lg:pb-28 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 animate-fadeInUp">Sobre Nós</h1>
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 max-w-3xl mx-auto animate-fadeInUp delay-200">
            Conheça a trajetória, os valores e o compromisso que movem nossa atuação jurídica.
          </p>
        </div>
      </section>

      {/* Citação em destaque */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto text-center">
            <i className="fas fa-quote-left text-3xl md:text-4xl text-accent opacity-50 mb-4 block"></i>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-primary italic leading-relaxed">
              "{content.quote}"
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-500 mt-4 md:mt-6">— {content.lawyerName}</p>
          </div>
        </div>
      </section>

      {/* Biografia com imagem */}
      <section className="py-16 md:py-24">
        <div className="container-custom px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Imagem do advogado */}
            <div className="relative max-w-md mx-auto lg:mx-0 w-full">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/advogado/foto-principal.jpg"
                  alt={content.lawyerName}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
              </div>
              
              {/* Badge flutuante 1 - Experiência */}
              <div className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 bg-white p-2 sm:p-5 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl z-20 animate-float">
                <p className="text-xl sm:text-3xl font-bold text-primary">{content.lawyerExperience}+</p>
                <p className="text-[10px] sm:text-sm text-gray-600 whitespace-nowrap">Anos de experiência</p>
              </div>
              
              {/* Badge flutuante 2 - Casos */}
              <div className="absolute -top-3 sm:-top-6 -left-3 sm:-left-6 bg-white p-2 sm:p-5 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl z-20 animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-xl sm:text-3xl font-bold text-primary">{content.lawyerCases}+</p>
                <p className="text-[10px] sm:text-sm text-gray-600 whitespace-nowrap">Casos bem-sucedidos</p>
              </div>
              
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-2xl sm:blur-3xl transform rotate-3"></div>
            </div>

            {/* Texto da biografia */}
            <div className="space-y-4 sm:space-y-6">
              <span className="text-accent font-semibold tracking-wider uppercase text-xs sm:text-sm">Nossa história</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">{content.lawyerName}</h2>
              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>{content.lawyerBio}</p>
                <p>
                  Sua trajetória é marcada pela defesa intransigente dos direitos de seus clientes, 
                  sempre pautada pela ética, transparência e busca incansável pela justiça. 
                  Ao longo de mais de uma década, construiu um histórico de casos bem-sucedidos 
                  e conquistou a confiança de centenas de pessoas e empresas.
                </p>
              </div>

              {/* Informações rápidas */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-graduation-cap text-accent text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Formação</p>
                    <p className="font-medium text-primary text-xs sm:text-sm md:text-base">PUC-Campinas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-scroll text-accent text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">OAB desde</p>
                    <p className="font-medium text-primary text-xs sm:text-sm md:text-base">2014</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas em cards */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="p-6 md:p-8 bg-primary/20 backdrop-blur-sm rounded-xl">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">{content.lawyerExperience}</p>
              <p className="text-xs md:text-sm uppercase tracking-wider opacity-90">Anos de experiência</p>
            </div>
            <div className="p-6 md:p-8 bg-primary/20 backdrop-blur-sm rounded-xl">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">{content.lawyerCases}+</p>
              <p className="text-xs md:text-sm uppercase tracking-wider opacity-90">Casos resolvidos</p>
            </div>
            <div className="p-6 md:p-8 bg-primary/20 backdrop-blur-sm rounded-xl">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">{content.stats.clientsSatisfied}%</p>
              <p className="text-xs md:text-sm uppercase tracking-wider opacity-90">Clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Associações */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Texto */}
            <div className="space-y-4 md:space-y-6">
              <span className="text-accent font-semibold tracking-wider uppercase text-xs sm:text-sm">OAB</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                Inscrição na OAB
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                Registro profissional ativo na Ordem dos Advogados do Brasil, garantindo atuação legal e ética.
              </p>
              
              <ul className="space-y-3 md:space-y-4 pt-4">
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-check text-accent text-xs"></i>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">OAB/SP 344.956</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-check text-accent text-xs"></i>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">Inscrito desde 2014</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-check text-accent text-xs"></i>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">Membro da Comissão de Direito Bancário</span>
                </li>
              </ul>
            </div>

            {/* Imagem decorativa */}
            <div className="relative max-w-md mx-auto lg:mx-0 w-full">
              <div className="bg-primary/5 rounded-2xl p-4 md:p-8">
                <img
                  src="/images/certificados/certificado-puc.jpg"
                  alt="Certificado OAB"
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 w-20 h-20 md:w-32 md:h-32 bg-accent/10 rounded-full blur-2xl md:blur-3xl"></div>
              <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-primary/20 rounded-full blur-xl md:blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase text-xs sm:text-sm">Atuação</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-2 mb-3 md:mb-4">
              Áreas de Especialização
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <span className="text-3xl md:text-4xl text-accent mb-2 md:mb-3 block">⚖️</span>
              <h3 className="font-bold text-primary text-sm md:text-base">Direito Civil</h3>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <span className="text-3xl md:text-4xl text-accent mb-2 md:mb-3 block">📄</span>
              <h3 className="font-bold text-primary text-sm md:text-base">Direito Trabalhista</h3>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <span className="text-3xl md:text-4xl text-accent mb-2 md:mb-3 block">🔒</span>
              <h3 className="font-bold text-primary text-sm md:text-base">Direito Criminal</h3>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <span className="text-3xl md:text-4xl text-accent mb-2 md:mb-3 block">🏛️</span>
              <h3 className="font-bold text-primary text-sm md:text-base">Direito Empresarial</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase text-xs sm:text-sm">Nossos valores</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-2 mb-3 md:mb-4">
              Princípios que nos guiam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl text-accent">⚖️</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">Ética</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Atuação pautada pelos mais altos padrões éticos.
              </p>
            </div>
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl text-accent">🔒</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">Sigilo</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Compromisso absoluto com a confidencialidade.
              </p>
            </div>
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl text-accent">📋</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">Resultado</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Foco em soluções eficientes e resultados concretos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container-custom px-4 text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Precisa de orientação jurídica?
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-10 max-w-2xl mx-auto">
            Entre em contato para uma análise inicial do seu caso e descubra como podemos ajudar.
          </p>
          <Link
            to="/contato"
            className="inline-block bg-accent text-primary px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-accent/30"
          >
            Falar com o advogado
          </Link>
        </div>
      </section>

      <WhatsAppButton whatsapp={content.whatsapp} />
      <Footer
        siteName={content.siteName}
        oab={content.oab}
        phone={content.phone}
        email={content.email}
        address={content.address}
        whatsapp={content.whatsapp}
      />
    </div>
  );
}