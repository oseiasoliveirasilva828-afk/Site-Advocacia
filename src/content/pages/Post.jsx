import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from '/src/utils/contentLoader';
import '../styles/animations.css';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    siteName: 'Dr. Carlos Silva',
    oab: 'OAB/SP 123.456',
    whatsapp: '5511999999999'
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
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

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

  function renderMarkdown(content) {
    if (!content) return '';
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    return marked.parse(content);
  }

  // Animações
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 via-paper-50 to-navy-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Loader elegante com selo dourado */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 border-2 border-gold-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-gold-500 border-t-transparent rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl text-navy-700">⚖️</span>
            </div>
          </motion.div>
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-navy-600 font-serif italic text-lg"
          >
            Carregando artigo...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 via-paper-50 to-navy-50">
        <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
        <div className="flex items-center justify-center px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-32 h-32 mx-auto mb-8 bg-navy-100 rounded-full flex items-center justify-center"
            >
              <span className="text-5xl text-navy-400">📜</span>
            </motion.div>
            
            <h1 className="text-4xl font-serif font-bold text-navy-800 mb-4">
              Artigo não encontrado
            </h1>
            
            <p className="text-lg text-navy-600/70 mb-12 font-light">
              O artigo que você procura pode ter sido removido ou ainda não foi publicado.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-3 px-8 py-4 bg-navy-800 text-paper-50 font-serif text-lg rounded-sm hover:bg-navy-700 transition-all shadow-lg hover:shadow-xl group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Voltar para o blog
                <span className="text-gold-500">⚖️</span>
              </Link>
            </motion.div>
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-navy-50 via-paper-50 to-navy-50 font-sans antialiased"
    >
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />

      {/* Banner decorativo sutil */}
      <div className="h-1 bg-gradient-to-r from-gold-500/0 via-gold-500/50 to-gold-500/0"></div>

      {/* Main content */}
      <main className="container-custom max-w-5xl py-12">
        {/* Breadcrumb animado */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-navy-500 hover:text-gold-500 transition-colors group text-sm tracking-wide"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Todos os artigos</span>
          </Link>
        </motion.div>

        {/* Card do artigo com efeito de papel */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="bg-white rounded-sm shadow-2xl border border-navy-100 relative overflow-hidden"
        >
          {/* Textura de papel */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Detalhe dourado no canto */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl"></div>
          
          {/* Conteúdo */}
          <div className="relative px-8 md:px-16 py-12 md:py-16">
            {/* Cabeçalho do artigo */}
            <motion.div variants={fadeInUp} className="mb-12">
              {/* Categoria com selo */}
              {post.data.category && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mb-6"
                >
                  <span className="px-4 py-1.5 bg-navy-50 text-navy-700 text-xs font-medium tracking-wider uppercase rounded-sm border-l-2 border-gold-500">
                    {post.data.category}
                  </span>
                </motion.div>
              )}

              {/* Título */}
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-800 mb-6 leading-tight text-center"
              >
                {post.data.title}
              </motion.h1>

              {/* Metadados estilo carta */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center gap-3 text-navy-500 border-b border-navy-100 pb-8"
              >
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  {post.data.date && (
                    <time className="flex items-center gap-2">
                      <span className="text-gold-500">📅</span>
                      {new Date(post.data.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  )}
                  <span className="text-navy-300">•</span>
                  <span className="flex items-center gap-2">
                    <span className="text-gold-500">⚖️</span>
                    <span className="font-serif">{post.data.author || `Dr. ${content.siteName}`}</span>
                  </span>
                </div>
                <span className="text-xs text-navy-400 font-mono tracking-wider">{content.oab}</span>
              </motion.div>
            </motion.div>

            {/* Imagem de destaque */}
            {post.data.image && (
              <motion.div 
                variants={fadeInUp}
                className="mb-12 -mx-4 md:-mx-8"
              >
                <div className="relative h-[400px] overflow-hidden rounded-sm shadow-xl group">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={post.data.image}
                    alt={post.data.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </motion.div>
            )}

            {/* Descrição */}
            {post.data.description && (
              <motion.div 
                variants={fadeInUp}
                className="mb-12 p-8 bg-navy-50/50 border-l-4 border-gold-500 rounded-r-sm italic text-navy-700 text-lg leading-relaxed"
              >
                "{post.data.description}"
              </motion.div>
            )}

            {/* Artigo */}
            <motion.article
              variants={fadeInUp}
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-navy-800 prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mt-16 prose-h1:mb-8 prose-h1:text-center
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-navy-100
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-navy-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-justify
                prose-a:text-gold-600 hover:prose-a:text-gold-500 prose-a:no-underline hover:prose-a:underline prose-a:transition-all
                prose-strong:text-navy-800 prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-8 prose-ul:my-8
                prose-ol:list-decimal prose-ol:pl-8 prose-ol:my-8
                prose-li:text-navy-700 prose-li:marker:text-gold-500/60
                prose-blockquote:border-l-4 prose-blockquote:border-gold-500/40 prose-blockquote:bg-navy-50/30 
                prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-sm
                prose-blockquote:not-italic prose-blockquote:text-navy-600 prose-blockquote:font-serif
                prose-img:rounded-sm prose-img:shadow-xl prose-img:my-12 prose-img:border prose-img:border-navy-100
                prose-hr:border-navy-100 prose-hr:my-16"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* Tempo de leitura */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 text-center"
            >
              <span className="text-xs text-navy-400 font-mono tracking-wider">
                • {Math.ceil(post.content.split(' ').length / 200)} min de leitura •
              </span>
            </motion.div>

            {/* Selo/Assinatura */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16 pt-8 border-t border-navy-100"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="mb-4"
                >
                  <div className="w-20 h-20 bg-navy-50 rounded-full flex items-center justify-center border-2 border-gold-500/30">
                    <span className="text-3xl text-gold-500">⚖️</span>
                  </div>
                </motion.div>
                
                <p className="font-serif text-xl text-navy-800 mb-2">{content.siteName}</p>
                <p className="text-sm text-navy-400 mb-4 font-mono">{content.oab}</p>
                
                {post.data.date && (
                  <p className="text-xs text-navy-400">
                    {new Date(post.data.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Navegação */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-navy-100 flex justify-between items-center"
            >
              <motion.div whileHover={{ x: -5 }}>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-navy-400 hover:text-gold-500 transition-colors group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Todos os artigos
                </Link>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.data.title,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copiado!');
                  }
                }}
                className="flex items-center gap-2 text-sm text-navy-400 hover:text-gold-500 transition-colors"
              >
                <span>Compartilhar</span>
                <span>🔗</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
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
    </motion.div>
  );
}