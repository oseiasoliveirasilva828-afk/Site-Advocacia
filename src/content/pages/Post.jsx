import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
        <div className="text-center text-white">
          <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-light tracking-wide">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
        <div className="text-center text-white max-w-md px-6">
          <h1 className="text-4xl font-bold mb-4">📄 Artigo não encontrado</h1>
          <p className="mb-8 text-white/80">O artigo que você está procurando pode ter sido removido ou ainda não foi publicado.</p>
          <Link to="/blog" className="inline-block bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
            ← Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans overflow-x-hidden bg-white">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />

      {/* Imagem de destaque com título sobreposto (se houver imagem) */}
      {post.data.image && (
        <div className="relative w-full h-[60vh] min-h-[500px]">
          <img
            src={post.data.image}
            alt={post.data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-custom pb-16 text-white">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-accent mb-6 transition group"
            >
              ← Voltar para artigos
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
              {post.data.title}
            </h1>
          </div>
        </div>
      )}

      {/* Se não houver imagem, usa cabeçalho padrão */}
      {!post.data.image && (
        <section className="pt-40 pb-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container-custom">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-accent mb-8 transition group"
            >
              ← Voltar para artigos
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
              {post.data.title}
            </h1>
          </div>
        </section>
      )}

      {/* Metadados */}
      <div className="container-custom py-8 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          {post.data.date && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
              <span>📅</span>
              <span>{new Date(post.data.date).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
          {post.data.category && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
              <span>🏷️</span>
              <span>{post.data.category}</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
            <span>👤</span>
            <span>{post.data.author || content.siteName}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
            <span>⏱️</span>
            <span>{Math.ceil(post.content.split(' ').length / 200)} min de leitura</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          {post.data.description && (
            <div className="mb-10 p-8 bg-gray-50 border-l-4 border-accent rounded-r-2xl text-lg text-gray-700 italic leading-relaxed">
              {post.data.description}
            </div>
          )}

          <article
            className="prose prose-lg md:prose-xl max-w-none
              prose-headings:font-bold prose-headings:text-primary
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-a:text-accent hover:prose-a:text-primary
              prose-strong:text-primary prose-strong:font-semibold
              prose-ul:list-disc prose-ol:list-decimal
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-img:rounded-2xl prose-img:shadow-xl"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Rodapé do artigo */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition group"
            >
              <span className="group-hover:-translate-x-1 transition">←</span> Todos os artigos
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-accent transition text-sm flex items-center gap-1"
            >
              <span>⬆</span> Voltar ao topo
            </button>
          </div>
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