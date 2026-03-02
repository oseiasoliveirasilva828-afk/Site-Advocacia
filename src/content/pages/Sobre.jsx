import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import LoadingScreen from '../components/LoadingScreen';
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
    
    lawyerBio: "Natural de Diadema, Edson Silva Maltez construiu uma trajetória sólida na advocacia, marcada pela dedicação e pelo compromisso com a justiça. Formado pela Pontifícia Universidade Católica de Campinas (PUC-Campinas), atua há 12 anos nas áreas de Direito Civil, Trabalhista, Imobiliário e Criminal, oferecendo consultoria, assessoria e defesa técnica com ética e atenção personalizada.",
    
    quote: "A justiça não é apenas uma profissão, é um compromisso com a verdade e com o próximo.",
    
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
        setTimeout(() => setLoading(false), 1000);
      }
    }
    loadData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
      
      {/* Hero da página Sobre - AUMENTADA A DISTÂNCIA DO HEADER */}
      <section className="pt-40 lg:pt-44 xl:pt-48 pb-16 lg:pb-20 xl:pb-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 lg:mb-4 animate-fadeInUp">Sobre Nós</h1>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-white/80 max-w-2xl lg:max-w-3xl mx-auto animate-fadeInUp delay-200">
            Conheça a trajetória, os valores e o compromisso que movem nossa atuação jurídica.
          </p>
        </div>
      </section>

      {/* Citação em destaque */}
      <section className="py-10 lg:py-12 xl:py-16 bg-gray-50">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl lg:max-w-4xl mx-auto text-center">
            <i className="fas fa-quote-left text-2xl md:text-3xl lg:text-4xl text-accent opacity-50 mb-3 lg:mb-4 block"></i>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-primary italic leading-relaxed">
              "{content.quote}"
            </p>
            <p className="text-xs md:text-sm lg:text-base text-gray-500 mt-3 lg:mt-4">— {content.lawyerName}</p>
          </div>
        </div>
      </section>

      {/* Biografia com imagem */}
      <section className="py-12 lg:py-16 xl:py-20">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Imagem do advogado */}
            <div className="relative max-w-md mx-auto lg:mx-0 w-full">
              <div className="relative z-10 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl">
                <img
                  src="/images/advogado/foto-principal.jpg"
                  alt={content.lawyerName}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
              </div>
              
              {/* Badge flutuante 1 - Experiência */}
              <div className="absolute -bottom-3 lg:-bottom-4 xl:-bottom-5 -right-3 lg:-right-4 xl:-right-5 bg-white p-2 lg:p-3 xl:p-4 rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl xl:shadow-2xl z-20 animate-float">
                <p className="text-lg lg:text-xl xl:text-2xl font-bold text-primary">{content.lawyerExperience}+</p>
                <p className="text-[10px] lg:text-xs text-gray-600 whitespace-nowrap">Anos de experiência</p>
              </div>
              
              {/* Badge flutuante 2 - Casos */}
              <div className="absolute -top-3 lg:-top-4 xl:-top-5 -left-3 lg:-left-4 xl:-left-5 bg-white p-2 lg:p-3 xl:p-4 rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl xl:shadow-2xl z-20 animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-lg lg:text-xl xl:text-2xl font-bold text-primary">{content.lawyerCases}+</p>
                <p className="text-[10px] lg:text-xs text-gray-600 whitespace-nowrap">Casos bem-sucedidos</p>
              </div>
              
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl lg:rounded-2xl blur-xl lg:blur-2xl xl:blur-3xl transform rotate-3"></div>
            </div>

            {/* Texto da biografia */}
            <div className="space-y-3 lg:space-y-4 xl:space-y-6">
              <span className="text-accent font-semibold tracking-wider uppercase text-xs lg:text-sm">Nossa história</span>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary">{content.lawyerName}</h2>
              <div className="space-y-2 lg:space-y-3 xl:space-y-4 text-gray-600 text-sm lg:text-base leading-relaxed">
                <p>{content.lawyerBio}</p>
                <p>
                  Sua trajetória é marcada pela defesa intransigente dos direitos de seus clientes, 
                  sempre pautada pela ética, transparência e busca incansável pela justiça. 
                  Ao longo de mais de uma década, construiu um histórico de casos bem-sucedidos 
                  e conquistou a confiança de centenas de pessoas e empresas.
                </p>
              </div>

              {/* Informações rápidas */}
              <div className="grid grid-cols-2 gap-2 lg:gap-3 xl:gap-4 pt-3 lg:pt-4">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-graduation-cap text-accent text-xs lg:text-sm xl:text-base"></i>
                  </div>
                  <div>
                    <p className="text-[10px] lg:text-xs text-gray-500">Formação</p>
                    <p className="font-medium text-primary text-xs lg:text-sm">PUC-Campinas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-scroll text-accent text-xs lg:text-sm xl:text-base"></i>
                  </div>
                  <div>
                    <p className="text-[10px] lg:text-xs text-gray-500">OAB desde</p>
                    <p className="font-medium text-primary text-xs lg:text-sm">2014</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas em cards */}
      <section className="py-10 lg:py-12 xl:py-14 bg-primary text-white">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 xl:gap-6 text-center">
            <div className="p-4 lg:p-5 xl:p-6 bg-primary/20 backdrop-blur-sm rounded-lg lg:rounded-xl">
              <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-accent mb-1 lg:mb-2">{content.lawyerExperience}</p>
              <p className="text-[10px] lg:text-xs uppercase tracking-wider opacity-90">Anos de experiência</p>
            </div>
            <div className="p-4 lg:p-5 xl:p-6 bg-primary/20 backdrop-blur-sm rounded-lg lg:rounded-xl">
              <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-accent mb-1 lg:mb-2">{content.lawyerCases}+</p>
              <p className="text-[10px] lg:text-xs uppercase tracking-wider opacity-90">Casos resolvidos</p>
            </div>
            <div className="p-4 lg:p-5 xl:p-6 bg-primary/20 backdrop-blur-sm rounded-lg lg:rounded-xl">
              <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-accent mb-1 lg:mb-2">{content.stats.clientsSatisfied}%</p>
              <p className="text-[10px] lg:text-xs uppercase tracking-wider opacity-90">Clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Associações */}
      <section className="py-12 lg:py-14 xl:py-16 bg-white">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Texto */}
            <div className="space-y-3 lg:space-y-4 xl:space-y-6">
              <span className="text-accent font-semibold tracking-wider uppercase text-xs lg:text-sm">OAB</span>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary leading-tight">
                Inscrição na OAB
              </h2>
              <p className="text-gray-600 text-sm lg:text-base">
                Registro profissional ativo na Ordem dos Advogados do Brasil, garantindo atuação legal e ética.
              </p>
              
              <ul className="space-y-2 lg:space-y-3 xl:space-y-4 pt-3 lg:pt-4">
                <li className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-check text-accent text-xs"></i>
                  </div>
                  <span className="text-gray-700 text-sm lg:text-base">OAB/SP 344.956</span>
                </li>
                <li className="flex items-start gap-2 lg:gap-3">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-check text-accent text-xs"></i>
                  </div>
                  <span className="text-gray-700 text-sm lg:text-base">Inscrito desde 2014</span>
                </li>
              </ul>
            </div>

            {/* Imagem decorativa */}
            <div className="relative max-w-md mx-auto lg:mx-0 w-full">
              <div className="bg-primary/5 rounded-xl lg:rounded-2xl p-4 lg:p-5 xl:p-6">
                <img
                  src="/images/certificados/certificado-puc.jpg"
                  alt="Certificado OAB"
                  className="rounded-lg lg:rounded-xl shadow-lg lg:shadow-xl xl:shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-3 lg:-bottom-4 xl:-bottom-5 -left-3 lg:-left-4 xl:-left-5 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-accent/10 rounded-full blur-xl lg:blur-2xl xl:blur-3xl"></div>
              <div className="absolute -top-3 lg:-top-4 xl:-top-5 -right-3 lg:-right-4 xl:-right-5 w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-primary/20 rounded-full blur-lg lg:blur-xl xl:blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-12 lg:py-14 xl:py-16 bg-gray-50">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl lg:max-w-3xl mx-auto mb-8 lg:mb-10 xl:mb-12">
            <span className="text-accent font-semibold tracking-wider uppercase text-xs lg:text-sm">Atuação</span>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary mt-2 mb-2 lg:mb-3 xl:mb-4">
              Áreas de Especialização
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3 xl:gap-4">
            <div className="bg-white p-3 lg:p-4 xl:p-5 rounded-lg lg:rounded-xl shadow-md hover:shadow-lg transition text-center">
              <span className="text-2xl lg:text-3xl text-accent mb-1 lg:mb-2 block">⚖️</span>
              <h3 className="font-bold text-primary text-xs lg:text-sm">Direito Civil</h3>
            </div>
            <div className="bg-white p-3 lg:p-4 xl:p-5 rounded-lg lg:rounded-xl shadow-md hover:shadow-lg transition text-center">
              <span className="text-2xl lg:text-3xl text-accent mb-1 lg:mb-2 block">📄</span>
              <h3 className="font-bold text-primary text-xs lg:text-sm">Direito Trabalhista</h3>
            </div>
            <div className="bg-white p-3 lg:p-4 xl:p-5 rounded-lg lg:rounded-xl shadow-md hover:shadow-lg transition text-center">
              <span className="text-2xl lg:text-3xl text-accent mb-1 lg:mb-2 block">🔒</span>
              <h3 className="font-bold text-primary text-xs lg:text-sm">Direito Criminal</h3>
            </div>
            <div className="bg-white p-3 lg:p-4 xl:p-5 rounded-lg lg:rounded-xl shadow-md hover:shadow-lg transition text-center">
              <span className="text-2xl lg:text-3xl text-accent mb-1 lg:mb-2 block">🏛️</span>
              <h3 className="font-bold text-primary text-xs lg:text-sm">Direito Empresarial</h3>
            </div>
            <div className="bg-white p-3 lg:p-4 xl:p-5 rounded-lg lg:rounded-xl shadow-md hover:shadow-lg transition text-center">
              <span className="text-2xl lg:text-3xl text-accent mb-1 lg:mb-2 block">🏠</span>
              <h3 className="font-bold text-primary text-xs lg:text-sm">Direito Imobiliário</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-12 lg:py-14 xl:py-16 bg-white">
        <div className="container-custom px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl lg:max-w-3xl mx-auto mb-8 lg:mb-10 xl:mb-12">
            <span className="text-accent font-semibold tracking-wider uppercase text-xs lg:text-sm">Nossos valores</span>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary mt-2 mb-2 lg:mb-3 xl:mb-4">
              Princípios que nos guiam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 xl:gap-5">
            <div className="bg-gray-50 p-4 lg:p-5 xl:p-6 rounded-xl lg:rounded-2xl shadow-md text-center group hover:shadow-lg transition-all">
              <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 xl:mb-4 group-hover:scale-110 transition-transform">
                <span className="text-xl lg:text-2xl text-accent">⚖️</span>
              </div>
              <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1 lg:mb-2">Ética</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Atuação pautada pelos mais altos padrões éticos.
              </p>
            </div>
            <div className="bg-gray-50 p-4 lg:p-5 xl:p-6 rounded-xl lg:rounded-2xl shadow-md text-center group hover:shadow-lg transition-all">
              <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 xl:mb-4 group-hover:scale-110 transition-transform">
                <span className="text-xl lg:text-2xl text-accent">🔒</span>
              </div>
              <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1 lg:mb-2">Sigilo</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Compromisso absoluto com a confidencialidade.
              </p>
            </div>
            <div className="bg-gray-50 p-4 lg:p-5 xl:p-6 rounded-xl lg:rounded-2xl shadow-md text-center group hover:shadow-lg transition-all">
              <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 xl:mb-4 group-hover:scale-110 transition-transform">
                <span className="text-xl lg:text-2xl text-accent">📋</span>
              </div>
              <h3 className="text-base lg:text-lg xl:text-xl font-bold text-primary mb-1 lg:mb-2">Resultado</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Foco em soluções eficientes e resultados concretos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-14 xl:py-16 bg-primary text-white">
        <div className="container-custom px-4 md:px-6 lg:px-8 text-center">
          <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 xl:mb-5">
            Precisa de orientação jurídica?
          </h3>
          <p className="text-sm lg:text-base xl:text-lg text-white/80 mb-4 lg:mb-5 xl:mb-6 max-w-xl lg:max-w-2xl mx-auto">
            Entre em contato para uma análise inicial do seu caso e descubra como podemos ajudar.
          </p>
          <Link
            to="/contato"
            className="inline-block bg-accent text-primary px-6 lg:px-7 xl:px-8 py-3 lg:py-3.5 xl:py-4 rounded-full font-bold text-sm lg:text-base hover:scale-105 transition-all shadow-xl lg:shadow-2xl hover:shadow-accent/30"
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