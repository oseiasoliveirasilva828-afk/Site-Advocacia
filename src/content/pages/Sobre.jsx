import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from '/src/utils/contentLoader';
import '../styles/animations.css';

export default function Sobre() {
  const [content, setContent] = useState({
    siteName: "Edson Silva Maltez",
    oab: "OAB/SP 344.956",
    phone: "(19) 99631-9810",
    whatsapp: "5519996319810",
    email: "dredsonmaltez@gmail.com",
    address: "Rua Francisco Biancalana, 31 - sala 02 - Vila Santana",
    lawyerName: "Edson Silva Maltez",
    lawyerBio: "Natural de Diadema, Edson Silva Maltez construiu uma trajetória sólida na advocacia, marcada pela dedicação e pelo compromisso com a justiça. Formado pela Pontifícia Universidade Católica de Campinas (PUC-Campinas), atua há 12 anos nas áreas de Direito Civil, Trabalhista e Criminal, oferecendo consultoria, assessoria e defesa técnica com ética e atenção personalizada.",
    experience: 12,
    cases: 350
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
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
      
      {/* Hero da página Sobre */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">Sobre Nós</h1>
          <p className="text-xl text-white/80 max-w-3xl animate-fadeInUp delay-200">
            Conheça a trajetória, os valores e o compromisso que movem nossa atuação jurídica.
          </p>
        </div>
      </section>

      {/* Biografia */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Imagem do advogado */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/advogado/foto-principal.jpg"
                  alt={content.lawyerName}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            </div>

            {/* Texto */}
            <div className="space-y-6">
              <span className="text-accent font-semibold tracking-wider uppercase">Nossa história</span>
              <h2 className="text-4xl font-bold text-primary">{content.lawyerName}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{content.lawyerBio}</p>
                <p>
                  Sua trajetória é marcada pela defesa intransigente dos direitos de seus clientes, 
                  sempre pautada pela ética, transparência e busca incansável pela justiça. 
                  Ao longo de mais de uma década, construiu um histórico de casos bem-sucedidos 
                  e conquistou a confiança de centenas de pessoas e empresas.
                </p>
              </div>

              {/* Números */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <p className="text-4xl font-bold text-primary">{content.experience}+</p>
                  <p className="text-gray-500">Anos de experiência</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">{content.cases}+</p>
                  <p className="text-gray-500">Casos bem-sucedidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificados e Formação */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase">Formação acadêmica</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
              Qualificação e excelência
            </h2>
            <p className="text-gray-600 text-lg">
              Investimento contínuo em conhecimento para oferecer o melhor suporte jurídico.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Certificado PUC-Campinas */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <img
                src="/images/certificados/certificado-puc.jpg"
                alt="Certificado PUC-Campinas"
                className="w-full h-auto object-contain rounded-lg mb-4 max-h-80 mx-auto"
              />
              <h3 className="text-xl font-bold text-primary mb-2">PUC-Campinas</h3>
              <p className="text-gray-600">
                Bacharel em Direito pela Pontifícia Universidade Católica de Campinas, 
                com sólida formação acadêmica e preparação para a advocacia.
              </p>
            </div>

            {/* Especializações */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <span className="text-3xl text-accent block mb-2">⚖️</span>
                  <span className="text-sm font-medium text-primary">Direito Civil</span>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <span className="text-3xl text-accent block mb-2">📄</span>
                  <span className="text-sm font-medium text-primary">Direito Trabalhista</span>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <span className="text-3xl text-accent block mb-2">🔒</span>
                  <span className="text-sm font-medium text-primary">Direito Criminal</span>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <span className="text-3xl text-accent block mb-2">🏛️</span>
                  <span className="text-sm font-medium text-primary">Direito Empresarial</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Especializações</h3>
              <p className="text-gray-600">
                Atuação especializada nas áreas de Direito Civil, Criminal, Trabalhista 
                e Empresarial, com atualização constante e domínio técnico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Foto do escritório */}
      <section className="py-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase">Nosso espaço</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
              Estrutura e acolhimento
            </h2>
            <p className="text-gray-600 text-lg">
              Um ambiente preparado para receber você com conforto e privacidade.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
              <img
                src="/images/escritorio/foto-escritorio.png"
                alt="Escritório de Advocacia"
                className="w-full h-auto object-contain max-h-[600px] mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valores (sem emojis) */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wider uppercase">Nossos valores</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
              Princípios que nos guiam
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-accent">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Ética</h3>
              <p className="text-gray-600">
                Atuação pautada pelos mais altos padrões éticos, com transparência e honestidade em todas as relações.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-accent">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Sigilo</h3>
              <p className="text-gray-600">
                Compromisso absoluto com a confidencialidade e a proteção das informações de nossos clientes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-accent">📋</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Resultado</h3>
              <p className="text-gray-600">
                Foco em soluções eficientes e na obtenção dos melhores resultados para cada caso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Precisa de orientação jurídica?
          </h3>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Entre em contato para uma análise inicial do seu caso e descubra como podemos ajudar.
          </p>
          <Link
            to="/contato"
            className="inline-block bg-accent text-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl"
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