import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from '/src/utils/contentLoader';
import '../styles/animations.css';

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: text };

  const data = {};
  match[1].split('\n').forEach((line) => {
    if (line.includes(': ')) {
      const [key, ...value] = line.split(': ');
      data[key.trim()] = value.join(': ').trim();
    }
  });

  return { data, content: match[2] };
}

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const articleRef = useRef(null);
  const [content, setContent] = useState({
    siteName: 'Edson Silva Maltez',
    oab: 'OAB/SP 344.956',
    whatsapp: '5519996319810',
    phone: '(19) 99631-9810',
    email: 'dredsonmaltez@gmail.com',
    address: 'Rua Francisco Biancalana, 31 - sala 02 - Vila Santana, Sumaré - SP'
  });

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await loadContent('/src/content/settings/general.md');
        setContent((prev) => ({ ...prev, ...settingsData?.data }));

        const response = await fetch(`/content/posts/${slug}.md`);

        if (response.ok) {
          const text = await response.text();
          const { data, content } = parseFrontmatter(text);
          setPost({ slug, data, content });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Erro ao carregar post:', error);
        setPost(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    }

    loadData();
  }, [slug]);

  function renderMarkdown(content) {
    if (!content) return '';
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false
    });
    return marked.parse(content);
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const articleContent = articleRef.current?.innerHTML || '';
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${post?.data?.title || 'Artigo'} - ${content.siteName}</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Merriweather', Georgia, serif;
              background-color: #F9F7F4;
              color: #2C3E50;
              line-height: 1.8;
              padding: 40px 20px;
            }
            
            .print-container {
              max-width: 800px;
              margin: 0 auto;
              background-color: white;
              padding: 60px;
              border-radius: 8px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            }
            
            h1 {
              font-size: 2.5rem;
              font-weight: 700;
              color: #1A2C3E;
              margin-bottom: 1rem;
              font-family: 'Merriweather', serif;
              line-height: 1.3;
            }
            
            .metadata {
              color: #666;
              font-size: 0.9rem;
              margin-bottom: 2rem;
              padding-bottom: 1rem;
              border-bottom: 2px solid #D4AF37;
              font-family: 'Inter', sans-serif;
            }
            
            h2 {
              font-size: 1.8rem;
              font-weight: 600;
              color: #1A2C3E;
              margin-top: 2rem;
              margin-bottom: 1rem;
              font-family: 'Merriweather', serif;
            }
            
            h2:before {
              content: '';
              display: inline-block;
              width: 30px;
              height: 2px;
              background: #D4AF37;
              margin-right: 15px;
              vertical-align: middle;
            }
            
            h3 {
              font-size: 1.4rem;
              font-weight: 600;
              color: #2C3E50;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
            }
            
            p {
              margin-bottom: 1.5rem;
              font-size: 1.1rem;
              line-height: 1.9;
              color: #2C3E50;
              word-wrap: break-word;
              overflow-wrap: break-word;
              white-space: normal;
            }
            
            blockquote {
              border-left: 4px solid #D4AF37;
              background-color: #F8F4F0;
              padding: 1.5rem 2rem;
              margin: 2rem 0;
              font-style: italic;
              border-radius: 0 8px 8px 0;
            }
            
            ul, ol {
              margin: 1.5rem 0 1.5rem 2rem;
            }
            
            li {
              margin-bottom: 0.5rem;
            }
            
            .footer-note {
              margin-top: 3rem;
              padding-top: 1.5rem;
              border-top: 1px solid #ddd;
              font-size: 0.9rem;
              color: #666;
              text-align: center;
              font-family: 'Inter', sans-serif;
            }
            
            @media print {
              body {
                background-color: white;
                padding: 0;
              }
              .print-container {
                box-shadow: none;
                padding: 40px;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <h1>${post?.data?.title || ''}</h1>
            <div class="metadata">
              ${post?.data?.date ? new Date(post.data.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : ''} | 
              ${post?.data?.author || `Dr. ${content.siteName}`} | 
              ${content.oab}
            </div>
            ${articleContent}
            <div class="footer-note">
              Publicado por ${content.siteName} • ${content.oab}<br>
              Fonte: ${window.location.href}
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: post?.data?.title || 'Artigo Jurídico',
      text: post?.data?.description || 'Confira este artigo jurídico',
      url: window.location.href
    };

    try {
      if (navigator.share && window.innerWidth <= 768) {
        await navigator.share(shareData);
      } else {
        setShowShareMenu(!showShareMenu);
      }
    } catch (error) {
      console.log('Erro ao compartilhar:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copiado para a área de transferência!');
    setShowShareMenu(false);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Confira este artigo: ${post?.data?.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setShowShareMenu(false);
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.data?.title || '');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    setShowShareMenu(false);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(post?.data?.title || '');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-2 border-accent/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl text-accent">⚖️</span>
            </div>
          </div>
          <p className="text-white/80 font-light tracking-wide">
            Carregando artigo...
          </p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-primary">
        <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
        
        <div className="h-20"></div>
        
        <div className="flex items-center justify-center px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center text-white"
          >
            <div className="w-40 h-40 mx-auto mb-8 bg-primary/80 rounded-full flex items-center justify-center border-2 border-accent/30">
              <span className="text-6xl text-accent">📜</span>
            </div>
            
            <h1 className="text-5xl font-bold text-accent mb-4">
              Artigo não encontrado
            </h1>
            
            <p className="text-xl text-white/70 mb-12 font-light">
              O artigo que você procura pode ter sido removido ou ainda não foi publicado.
            </p>

            <Link
              to="/blog"
              className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-primary font-bold text-lg hover:bg-accent/90 transition-all shadow-2xl hover:shadow-accent/20 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Voltar para o blog
            </Link>
          </motion.div>
        </div>
        
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - FICA ACIMA DA FAIXA AZUL */}
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
      
      {/* FAIXA AZUL SUPERIOR - COM HEADER SOBREPOSTO */}
      <div className="bg-primary pt-24 pb-16 border-b border-accent/20">
        <div className="container-custom text-center text-white">
          <div className="max-w-3xl mx-auto">
            <span className="text-accent font-semibold tracking-wider uppercase mb-4 inline-block">
              DOUTRINA & JURISPRUDÊNCIA
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Artigos Jurídicos
            </h2>
            <p className="text-xl text-white/80 font-light">
              Análises aprofundadas sobre os temas mais relevantes do direito contemporâneo, 
              elaboradas por especialistas comprometidos com a excelência.
            </p>
            <div className="w-20 h-1 bg-accent mx-auto mt-8"></div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="container-custom max-w-4xl py-16">
        {/* Navegação */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-accent mb-8 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Todos os artigos
        </Link>

        {/* Imagem de destaque (se houver) */}
        {post.data.image && (
          <div className="mb-8">
            <img
              src={post.data.image}
              alt={post.data.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Cabeçalho do artigo - COM ÍCONES OFICIAIS */}
        <div className="mb-8">
          {post.data.category && (
            <span className="text-sm text-accent font-semibold uppercase tracking-wider">
              {post.data.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            {post.data.title}
          </h1>
          {post.data.description && (
            <p className="text-xl text-gray-600 mb-4 font-light border-l-4 border-accent/30 pl-4">
              {post.data.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {post.data.date && (
              <time className="flex items-center gap-1">
                <i className="far fa-calendar-alt text-accent"></i>
                <span>{new Date(post.data.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </time>
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-gavel text-accent"></i>
              <span>{post.data.author || `Dr. ${content.siteName}`}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-scroll text-accent"></i>
              <span>{content.oab}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <i className="far fa-clock text-accent"></i>
              <span>{Math.ceil(post.content.split(' ').length / 200)} min</span>
            </span>
          </div>
        </div>

        {/* Artigo */}
        <article 
          ref={articleRef}
          className="prose prose-lg max-w-none
            prose-headings:text-primary prose-headings:font-bold
            prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-primary
            prose-ul:list-disc prose-ol:list-decimal
            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            prose-img:rounded-lg prose-img:shadow-md
            break-words whitespace-pre-wrap"
        >
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
        </article>

        {/* Ações do artigo - COM ÍCONES OFICIAIS */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition-colors group"
          >
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            <span>Todos os artigos</span>
          </Link>
          
          <div className="flex items-center gap-2">
            {/* Botão Compartilhar */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-accent hover:text-accent transition-all shadow-sm"
              >
                <i className="fas fa-share-alt"></i>
                <span className="hidden sm:inline">Compartilhar</span>
              </button>
              
              {/* Menu de compartilhamento - COM ÍCONES OFICIAIS */}
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <button
                    onClick={copyToClipboard}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-accent flex items-center gap-3 transition-colors"
                  >
                    <i className="fas fa-link text-accent w-5"></i>
                    <span>Copiar link</span>
                  </button>
                  <button
                    onClick={shareOnWhatsApp}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-accent flex items-center gap-3 transition-colors"
                  >
                    <i className="fab fa-whatsapp text-accent w-5"></i>
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-accent flex items-center gap-3 transition-colors"
                  >
                    <i className="fab fa-linkedin-in text-accent w-5"></i>
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-accent flex items-center gap-3 transition-colors"
                  >
                    <i className="fab fa-twitter text-accent w-5"></i>
                    <span>Twitter</span>
                  </button>
                </div>
              )}
            </div>

            {/* Botão Imprimir */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-accent hover:text-accent transition-all shadow-sm"
            >
              <i className="fas fa-print"></i>
              <span className="hidden sm:inline">Imprimir</span>
            </button>
          </div>
        </div>

        {/* Bio do autor */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-user-tie text-2xl text-accent"></i>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-1">{content.siteName}</h4>
              <p className="text-sm text-gray-500 mb-2">{content.oab}</p>
              <p className="text-gray-600 text-sm">
                Advogado especialista em Direito Civil, Trabalhista e Criminal. 
                Membro da OAB/SP desde 2012, com atuação dedicada e atenção personalizada a cada cliente.
              </p>
            </div>
          </div>
        </div>
      </main>

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