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
    marked.setOptions({ breaks: true, gfm: true });
    return marked.parse(content);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4 text-sm">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-light text-gray-800 mb-2">Artigo não encontrado</h1>
          <p className="text-gray-400 text-sm mb-6">O link pode estar quebrado ou o artigo foi removido.</p>
          <Link to="/blog" className="text-sm text-black border-b border-black pb-0.5 hover:opacity-60 transition">
            ← Voltar ao blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans antialiased text-gray-900">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />

      {/* Imagem de abertura — se houver */}
      {post.data.image && (
        <div className="w-full h-[60vh] min-h-[500px] overflow-hidden bg-black/5">
          <img
            src={post.data.image}
            alt={post.data.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Área principal do artigo */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <Link
          to="/blog"
          className="inline-block text-sm text-gray-400 hover:text-black transition-colors mb-12"
        >
          ← Todos os artigos
        </Link>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight mb-6">
          {post.data.title}
        </h1>

        {/* Metadados */}
        <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-8 mb-10">
          <time dateTime={post.data.date}>
            {new Date(post.data.date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{Math.ceil(post.content.split(' ').length / 200)} min de leitura</span>
          {post.data.category && (
            <>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-gray-600">{post.data.category}</span>
            </>
          )}
        </div>

        {/* Descrição (se houver) */}
        {post.data.description && (
          <div className="mb-12 text-lg text-gray-500 border-l-2 border-gray-300 pl-6 italic">
            {post.data.description}
          </div>
        )}

        {/* Corpo do artigo */}
        <article
          className="
            prose prose-lg max-w-none
            prose-headings:font-light prose-headings:text-gray-800
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-black prose-a:border-b prose-a:border-gray-300 prose-a:no-underline hover:prose-a:border-black
            prose-strong:text-gray-800 prose-strong:font-medium
            prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-600
            prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-500
            prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
            prose-hr:border-gray-200
          "
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Rodapé do artigo */}
        <footer className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-sm">
          <Link
            to="/blog"
            className="text-gray-400 hover:text-black transition-colors flex items-center gap-1"
          >
            ← Voltar ao blog
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gray-400 hover:text-black transition-colors flex items-center gap-1"
          >
            <span>↑</span> Início
          </button>
        </footer>
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