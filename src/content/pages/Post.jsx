import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from '/src/utils/contentLoader';
import '../styles/animations.css';

// ----------------------------------------------------------------------
// Helper: parseFrontmatter
// ----------------------------------------------------------------------
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

// ----------------------------------------------------------------------
// Componente de Background com partículas
// ----------------------------------------------------------------------
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 170, 100, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" style={{ zIndex: 0 }} />;
};

// ----------------------------------------------------------------------
// Componente de Barra de Progresso
// ----------------------------------------------------------------------
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// ----------------------------------------------------------------------
// Componente de Loader Cinematográfico
// ----------------------------------------------------------------------
const CinematicLoader = ({ siteName, oab }) => (
  <div className="fixed inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 flex items-center justify-center">
    <div className="relative">
      {/* Anéis concêntricos */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-gold-500/30 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: 200 + i * 40,
            height: 200 + i * 40,
            left: -((200 + i * 40) / 2) + 100,
            top: -((200 + i * 40) / 2) + 100
          }}
        />
      ))}

      {/* Logo central */}
      <motion.div
        className="relative w-48 h-48 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-transparent rounded-full blur-2xl" />
        <div className="relative w-32 h-32 bg-gradient-to-br from-navy-800 to-navy-900 rounded-full flex items-center justify-center border-2 border-gold-500/50 shadow-2xl">
          <motion.span
            className="text-6xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚖️
          </motion.span>
        </div>
      </motion.div>

      {/* Texto animado */}
      <motion.div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="text-gold-500/80 font-light tracking-[0.3em] text-sm mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CARREGANDO
        </motion.p>
        <p className="text-white/90 font-serif text-lg">{siteName}</p>
        <p className="text-navy-400 text-xs mt-1">{oab}</p>
      </motion.div>
    </div>
  </div>
);

// ----------------------------------------------------------------------
// Componente principal
// ----------------------------------------------------------------------
export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    siteName: 'Dr. Carlos Silva',
    oab: 'OAB/SP 123.456',
    whatsapp: '5511999999999',
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await loadContent('/src/content/settings/general.md');
        setContent((prev) => ({ ...prev, ...settingsData?.data }));

        const response = await fetch(`/content/posts/${slug}.md`);

        if (response.ok) {
          const text = await response.text();
          const { data, content: markdownContent } = parseFrontmatter(text);
          setPost({ slug, data, content: markdownContent });
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

  if (loading) {
    return <CinematicLoader siteName={content.siteName} oab={content.oab} />;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
        <div className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-xl border-b border-gold-500/20">
          <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
        </div>

        <main className="relative min-h-[80vh] flex items-center justify-center px-4">
          <ParticleBackground />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative text-center max-w-2xl"
          >
            {/* Glitch effect container */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent blur-3xl -z-10" />
            
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl flex items-center justify-center border border-gold-500/30 shadow-2xl"
            >
              <span className="text-5xl text-gold-500/80">404</span>
            </motion.div>

            <motion.h1
              className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 mb-6"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              style={{ backgroundSize: '200%' }}
            >
              ARTIGO NÃO ENCONTRADO
            </motion.h1>

            <p className="text-navy-300 text-xl mb-12 font-light">
              O conteúdo que você procura pode ter sido movido ou ainda não foi publicado.
            </p>

            <Link
              to="/blog"
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-gold-500/30 transition-shadow duration-300"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative flex items-center gap-3">
                ← VOLTAR PARA O BLOG
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </main>

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

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-navy-50"
      ref={containerRef}
    >
      {/* Barra de progresso */}
      <ReadingProgress />

      {/* Background particles */}
      <ParticleBackground />

      {/* HEADER COM EFEITOS DE SCROLL */}
      <motion.div
        className="sticky top-0 z-50"
        style={{
          opacity: headerOpacity,
          filter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          scale: headerScale,
        }}
      >
        <div className="bg-white/70 backdrop-blur-xl border-b border-gold-500/20 shadow-2xl">
          <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />
        </div>
      </motion.div>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="relative container mx-auto px-4 py-16 max-w-5xl">
        {/* Breadcrumb animado */}
        <motion.nav
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-12 flex items-center gap-3 text-sm"
        >
          <Link to="/blog" className="text-navy-600 hover:text-gold-600 transition-colors relative group">
            Blog
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300"
            />
          </Link>
          <span className="text-gold-500">/</span>
          <span className="text-navy-900 font-medium line-clamp-1">{post.data.title}</span>
        </motion.nav>

        {/* Card principal com efeitos 3D */}
        <motion.article
          initial={{ opacity: 0, y: 100, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-gold-500/20 overflow-hidden group"
          whileHover={{ boxShadow: "0 60px 120px -20px rgba(212, 175, 55, 0.3)" }}
        >
          {/* Bordas animadas */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1), transparent 70%)',
            }}
          />

          {/* Linhas decorativas animadas */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent animate-gradient-x" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent animate-gradient-x" />

          {/* Cabeçalho do artigo */}
          <header className="relative p-12 md:p-16 border-b border-navy-100 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />

            {post.data.category && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <span className="relative inline-block px-6 py-2 bg-gradient-to-r from-navy-900 to-navy-800 text-gold-500 text-xs font-bold tracking-[0.3em] uppercase rounded-full">
                  {post.data.category}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-gold-500/50"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </motion.div>
            )}

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-black text-navy-900 mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {post.data.title.split(' ').map((word, i, arr) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {word}
                  {i < arr.length - 1 && ' '}
                </motion.span>
              ))}
            </motion.h1>

            {/* Metadados com animação */}
            <motion.div
              className="flex flex-wrap items-center gap-8 text-navy-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {post.data.date && (
                <motion.div
                  className="flex items-center gap-3 group/date"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-2xl text-gold-500">📅</span>
                  <div>
                    <p className="text-xs text-navy-400 mb-1">PUBLICADO EM</p>
                    <time className="font-bold">
                      {new Date(post.data.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      }).toUpperCase()}
                    </time>
                  </div>
                </motion.div>
              )}

              <div className="w-px h-12 bg-gradient-to-b from-transparent via-navy-300 to-transparent" />

              <motion.div
                className="flex items-center gap-3 group/author"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl text-gold-500">⚖️</span>
                <div>
                  <p className="text-xs text-navy-400 mb-1">AUTOR</p>
                  <p className="font-bold">{post.data.author || `DR. ${content.siteName}`}</p>
                </div>
              </motion.div>

              <div className="w-px h-12 bg-gradient-to-b from-transparent via-navy-300 to-transparent" />

              <motion.div
                className="flex items-center gap-3 group/oab"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl text-gold-500">📋</span>
                <div>
                  <p className="text-xs text-navy-400 mb-1">OAB</p>
                  <p className="font-bold font-mono">{content.oab}</p>
                </div>
              </motion.div>
            </motion.div>
          </header>

          {/* Imagem de destaque com parallax */}
          {post.data.image && (
            <motion.figure
              className="relative h-[60vh] overflow-hidden"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <motion.img
                src={post.data.image}
                alt={post.data.title}
                className="w-full h-full object-cover"
                style={{
                  scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.2]),
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
              
              {/* Overlay de brilho */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              />
            </motion.figure>
          )}

          {/* Descrição */}
          {post.data.description && (
            <motion.div
              className="px-12 md:px-16 pt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <blockquote className="relative text-2xl text-navy-700 font-light italic pl-12 py-6">
                <motion.span
                  className="absolute left-0 top-0 text-8xl text-gold-500/20 font-serif"
                  animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  "
                </motion.span>
                {post.data.description}
              </blockquote>
            </motion.div>
          )}

         {/* Conteúdo do artigo */}
          <div className="px-12 md:px-16 py-12">
            <motion.div
              className="prose prose-lg max-w-none
                prose-headings:font-black prose-headings:text-navy-900 prose-headings:tracking-tight
                prose-h1:text-4xl prose-h1:mt-16 prose-h1:mb-8 prose-h1:relative
                prose-h1:before:content-[''] prose-h1:before:absolute prose-h1:before:-left-12 prose-h1:before:w-1 prose-h1:before:h-full prose-h1:before:bg-gradient-to-b prose-h1:before:from-gold-500 prose-h1:before:to-transparent
                prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-gold-500/30
                prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-navy-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg prose-p:font-light
                prose-a:text-gold-600 hover:prose-a:text-gold-500 prose-a:no-underline prose-a:relative
                prose-a:after:content-[''] prose-a:after:absolute prose-a:after:bottom-0 prose-a:after:left-0 prose-a:after:w-full prose-a:after:h-px prose-a:after:bg-gold-500 prose-a:after:scale-x-0 hover:prose-a:after:scale-x-100 prose-a:after:transition-transform prose-a:after:duration-300
                prose-strong:text-navy-900 prose-strong:font-black
                prose-ul:list-none prose-ul:pl-0 prose-ul:my-10
                prose-li:text-navy-700 prose-li:text-lg prose-li:mb-4 prose-li:relative prose-li:pl-8
                prose-li:before:content-['→'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-gold-500 prose-li:before:font-bold
                prose-blockquote:border-none prose-blockquote:bg-gradient-to-r prose-blockquote:from-navy-50 prose-blockquote:to-transparent
                prose-blockquote:py-8 prose-blockquote:px-12 prose-blockquote:rounded-2xl prose-blockquote:my-12
                prose-blockquote:not-italic prose-blockquote:text-navy-700 prose-blockquote:font-light prose-blockquote:text-xl prose-blockquote:relative
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12 prose-img:border-8 prose-img:border-white prose-img:transition-transform hover:prose-img:scale-[1.02] prose-img:duration-700
                prose-hr:border-navy-200 prose-hr:my-16 prose-hr:relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              dangerouslySetInnerHTML={{
                __html: marked.parse(post.content, { breaks: true, gfm: true }),
              }}
            />
            
            {/* CSS personalizado para os elementos que causavam erro */}
            <style>{`
              .prose blockquote::before {
                content: '"';
                position: absolute;
                left: -0.5rem;
                top: -1rem;
                font-size: 8rem;
                color: rgba(212, 175, 55, 0.2);
                font-family: serif;
                line-height: 1;
                pointer-events: none;
                z-index: 0;
              }
              
              .prose hr::before {
                content: "⚖️";
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: -0.75rem;
                background: white;
                padding: 0 1rem;
                color: #d4af37;
                font-size: 1rem;
                z-index: 1;
                white-space: nowrap;
              }
              
              .prose blockquote {
                position: relative;
                overflow: hidden;
              }
              
              .prose blockquote > * {
                position: relative;
                z-index: 1;
              }
              
              .prose hr {
                position: relative;
                border-color: #e2e8f0;
                margin: 4rem 0;
                overflow: visible;
              }
            `}</style>
          </div>

          {/* Rodapé do artigo */}
          <footer className="px-12 md:px-16 pb-16">
            {/* Separador animado */}
            <motion.div
              className="relative h-32 my-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
              
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl flex items-center justify-center border-2 border-gold-500/50 shadow-2xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
              >
                <span className="text-3xl text-gold-500">⚖️</span>
              </motion.div>
            </motion.div>

            {/* Informações finais */}
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className="bg-gradient-to-br from-navy-50 to-white p-8 rounded-2xl border border-gold-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl text-white">⚖️</span>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400 mb-1">SOBRE O AUTOR</p>
                    <p className="font-bold text-lg">{content.siteName}</p>
                    <p className="text-sm text-navy-600">{content.oab}</p>
                  </div>
                </div>
                <p className="text-navy-600 text-sm leading-relaxed">
                  Advogado especialista com mais de 15 anos de experiência em direito civil e empresarial.
                </p>
              </div>

              <div className="bg-gradient-to-br from-navy-50 to-white p-8 rounded-2xl border border-gold-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl text-white">⏱️</span>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400 mb-1">TEMPO DE LEITURA</p>
                    <p className="font-bold text-lg">{readingTime} MINUTOS</p>
                    <p className="text-sm text-navy-600">Aprox. {post.content.split(' ').length} palavras</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ações finais */}
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t border-navy-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <Link
                to="/blog"
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-navy-900 text-white rounded-xl overflow-hidden hover:bg-navy-800 transition-all duration-300"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center gap-2">
                  <motion.span
                    animate={{ x: [-5, 0, -5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ←
                  </motion.span>
                  TODOS OS ARTIGOS
                </span>
              </Link>

              <motion.button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.data.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    // Toast notification
                    alert('Link copiado!');
                  }
                }}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative flex items-center gap-2">
                  COMPARTILHAR
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    ↻
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </footer>
        </motion.article>

        {/* Espaçamento extra */}
        <div className="h-24" />
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