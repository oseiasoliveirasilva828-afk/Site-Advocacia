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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-light text-gray-800 mb-4">Artigo não encontrado</h1>
          <p className="text-gray-500 mb-8">O artigo que você procura pode ter sido removido.</p>
          <Link to="/blog" className="text-primary border-b border-primary pb-1 hover:text-accent transition">
            ← Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-serif bg-white">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />

      {/* Imagem de destaque com tratamento suave */}
      {post.data.image && (
        <div className="w-full h-[50vh] min-h-[400px] overflow-hidden bg-black/5">
          <img
            src={post.data.image}
            alt={post.data.title}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-700"
          />
        </div>
      )}

      {/* Área de leitura principal */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Navegação sutil */}
        <Link
          to="/blog"
          className="inline-flex items-center text-sm text-gray-400 hover:text-primary mb-12 transition"
        >
          ← Todos os artigos
        </Link>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6">
          {post.data.title}
        </h1>

        {/* Metadados discretos */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-12 pb-6 border-b border-gray-100">
          {post.data.date && (
            <time dateTime={post.data.date}>
              {new Date(post.data.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          )}
          {post.data.category && (
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              {post.data.category}
            </span>
          )}
          <span>por {post.data.author || content.siteName}</span>
          <span>{Math.ceil(post.content.split(' ').length / 200)} min de leitura</span>
        </div>

        {/* Descrição (se houver) */}
        {post.data.description && (
          <div className="text-xl text-gray-600 leading-relaxed mb-12 pl-6 border-l-4 border-accent">
            {post.data.description}
          </div>
        )}

        {/* Conteúdo do artigo com tipografia refinada */}
        <article
          className="
            prose prose-lg max-w-none
            prose-headings:font-light prose-headings:text-gray-800
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-800 prose-strong:font-medium
            prose-ul:list-disc prose-ol:list-decimal
            prose-blockquote:text-gray-500 prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic
            prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
          "
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Separador final sutil */}
        <div className="mt-20 pt-8 border-t border-gray-100 text-center">
          <Link
            to="/blog"
            className="inline-block text-gray-400 hover:text-primary transition text-sm"
          >
            ← Todos os artigos
          </Link>
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