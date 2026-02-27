import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import { loadContent } from "/src/utils/contentLoader";
import '../styles/animations.css';

export default function Home() {
  const [content, setContent] = useState({
    siteName: "Edson Silva Maltez",
    oab: "OAB/SP 344.956",
    phone: "(19) 99631-9810",
    whatsapp: "5519996319810",
    email: "dredsonmaltez@gmail.com",
    address: "Rua Francisco Biancalana, 31 - sala 02 - Vila Santana, Sumaré - SP",
    instagram: "#",
    linkedin: "#",
    facebook: "#",
    heroTitle: "Excelência e Compromisso em Direito",
    heroSubtitle: "Há mais de 12 anos defendendo seus direitos com ética, dedicação e soluções jurídicas eficientes.",
    heroImage: "",
    lawyerName: "Edson Silva Maltez",
    lawyerBio: "Natural de Diadema, Edson Silva Maltez construiu uma trajetória sólida na advocacia, marcada pela dedicação e pelo compromisso com a justiça. Formado pela PUC Campinas, atua há 12 anos nas áreas de Direito Civil, Trabalhista e Criminal, oferecendo consultoria, assessoria e defesa técnica com ética e atenção personalizada.",
    lawyerPhoto: "/images/advogado/foto-principal.jpg",
    experience: 12,
    cases: 350
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await loadContent('/src/content/settings/general.md');
        const homeData = await loadContent('/src/content/pages/home.md');
        
        setContent(prev => ({
          ...prev,
          ...settingsData?.data,
          ...homeData?.data
        }));
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
    <div className="font-sans overflow-x-hidden">
      <Header 
        siteName={content.siteName}
        oab={content.oab}
        whatsapp={content.whatsapp}
      />
      
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        whatsapp={content.whatsapp}
        heroImage={content.heroImage}
      />
      
      <AboutSection
        lawyerName={content.lawyerName}
        lawyerBio={content.lawyerBio}
        lawyerPhoto={content.lawyerPhoto}
        experience={content.experience}
        cases={content.cases}
      />
      
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase">Nossos serviços</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
              Áreas de Atuação
            </h2>
            <p className="text-gray-600 text-lg">
              Atuação estratégica nas principais áreas do direito, com soluções personalizadas 
              para cada caso e compromisso com a excelência jurídica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Direito Civil */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-3xl text-accent group-hover:scale-110 transition-transform">
                <i className="fas fa-gavel"></i>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">Direito Civil</h3>
              <p className="text-gray-600 leading-relaxed">
                Assessoria em contratos, responsabilidade civil, indenizações, direitos do consumidor 
                e questões familiares. Soluções claras e eficientes para a proteção dos seus direitos 
                e interesses patrimoniais e pessoais.
              </p>
            </div>

            {/* Direito Criminal */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-3xl text-accent group-hover:scale-110 transition-transform">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">Direito Criminal</h3>
              <p className="text-gray-600 leading-relaxed">
                Defesa técnica especializada em todas as fases do processo penal, com atuação sigilosa, 
                estratégica e fundamentada. Orientação preventiva e acompanhamento em investigações 
                e ações criminais.
              </p>
            </div>

            {/* Direito Trabalhista */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-3xl text-accent group-hover:scale-110 transition-transform">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">Direito Trabalhista</h3>
              <p className="text-gray-600 leading-relaxed">
                Representação de empregados e empregadores em ações trabalhistas, acordos, rescisões 
                e consultoria preventiva. Atuação focada na prevenção de conflitos e na defesa dos 
                direitos violados nas relações de trabalho.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-accent font-semibold tracking-wider uppercase">Soluções corporativas</span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Assessoria e<br />consultoria para empresas
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Assessoria jurídica estratégica para empresas de todos os portes, com orientação 
                preventiva, análise de riscos e suporte legal completo para decisões seguras 
                e alinhadas à legislação.
              </p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <i className="fas fa-check text-xs"></i>
                  </span>
                  <span className="text-gray-700">Consultoria preventiva e gestão de riscos legais</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <i className="fas fa-check text-xs"></i>
                  </span>
                  <span className="text-gray-700">Elaboração e revisão de contratos empresariais</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <i className="fas fa-check text-xs"></i>
                  </span>
                  <span className="text-gray-700">Suporte em negociações e mediação de conflitos</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <i className="fas fa-check text-xs"></i>
                  </span>
                  <span className="text-gray-700">Acompanhamento em processos administrativos e judiciais</span>
                </li>
              </ul>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 mt-6 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Solicite uma consultoria
                <i className="fas fa-arrow-right text-accent"></i>
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-primary text-white p-8 rounded-2xl shadow-2xl animate-float">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
                <h3 className="text-2xl font-bold mb-6">Diferenciais da nossa assessoria</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-accent text-2xl">
                      <i className="fas fa-bullseye"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Estratégia personalizada</h4>
                      <p className="text-white/70 text-sm">
                        Soluções jurídicas desenhadas especificamente para a realidade e os objetivos do seu negócio.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-accent text-2xl">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Agilidade e eficiência</h4>
                      <p className="text-white/70 text-sm">
                        Respostas rápidas e precisas para suas demandas jurídicas, com foco em resultados.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-accent text-2xl">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Sigilo e confiança</h4>
                      <p className="text-white/70 text-sm">
                        Total confidencialidade e compromisso absoluto com a proteção dos seus interesses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase">Metodologia</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
              Como Atuamos
            </h2>
            <p className="text-gray-600 text-lg">
              Um processo de trabalho estruturado para oferecer segurança, transparência 
              e resultados efetivos em cada etapa da sua demanda jurídica.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group animate-fadeInUp">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-accent group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Consulta inicial</h3>
              <p className="text-gray-600">
                Análise aprofundada do seu caso, identificação de necessidades e definição da 
                estratégia jurídica mais adequada aos seus objetivos.
              </p>
            </div>
            <div className="text-center group animate-fadeInUp delay-200">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-accent group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Planejamento estratégico</h3>
              <p className="text-gray-600">
                Desenvolvimento de um plano de ação personalizado, com análise de riscos e 
                definição das melhores soluções legais para o seu caso.
              </p>
            </div>
            <div className="text-center group animate-fadeInUp delay-400">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-accent group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Acompanhamento contínuo</h3>
              <p className="text-gray-600">
                Atualização constante sobre o andamento do processo, com total transparência 
                e disponibilidade para esclarecer dúvidas em todos os momentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold tracking-wider uppercase">Diferenciais</span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6">
                Por que nos escolher
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4 animate-slideInLeft">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-accent text-2xl">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Atendimento personalizado</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Cada cliente é único. Desenvolvemos estratégias sob medida, com atenção individual 
                      e soluções específicas para cada necessidade, garantindo acolhimento e confiança.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 animate-slideInLeft delay-200">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-accent text-2xl">
                    <i className="fas fa-scale-balanced"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Experiência e compromisso</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Mais de 12 anos de atuação nas áreas Cível, Trabalhista e Criminal, com foco 
                      em segurança jurídica, ética profissional e resultados concretos para nossos clientes.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 animate-slideInLeft delay-400">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-accent text-2xl">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Acompanhamento transparente</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Você recebe atualizações claras e periódicas sobre cada etapa do processo, 
                      mantendo total confiança e tranquilidade durante todo o acompanhamento jurídico.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slideInRight">
              <div className="bg-primary text-white p-10 rounded-2xl shadow-2xl">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-6">Compromissos com nossos clientes</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="text-accent"><i className="fas fa-check-circle"></i></span>
                    <span>Ética e transparência em todas as relações</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent"><i className="fas fa-check-circle"></i></span>
                    <span>Sigilo profissional absoluto</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent"><i className="fas fa-check-circle"></i></span>
                    <span>Atualização constante e excelência técnica</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent"><i className="fas fa-check-circle"></i></span>
                    <span>Comunicação clara e acessível</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA para Contato - substitui a ContactSection */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeInUp">
            Pronto para resolver sua questão jurídica?
          </h3>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fadeInUp delay-200">
            Entre em contato agora mesmo e agende uma consulta. Estamos prontos para ajudar.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-3 bg-accent text-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-accent/30 animate-fadeInUp delay-400 group"
          >
            <span>Falar com o advogado</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
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