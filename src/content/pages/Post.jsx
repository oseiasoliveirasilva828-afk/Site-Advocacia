import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked'; // ESSENCIAL
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from "/src/utils/contentLoader";
import '../styles/animations.css';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    siteName: "Dr. Carlos Silva",
    oab: "OAB/SP 123.456",
    whatsapp: "5511999999999"
  });

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await loadContent('/src/content/settings/general.md');
        setContent(prev => ({ ...prev, ...settingsData?.data }));

        const response = await fetch(`/src/content/posts/${slug}.md`);
        if (response.ok) {
          const text = await response.text();
          const { data, content } = parseFrontmatter(text);
          setPost({ slug, data, content });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Erro:', error);
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
    match[1].split('\n').forEach(line => {
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
      gfm: true,
    });
    return marked.parse(content);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            ← Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans overflow-x-hidden">
      <Header siteName={content.siteName} oab={content.oab} whatsapp={content.whatsapp} />

      <section className="pt-32 pb-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-accent mb-8 group">
            ← Voltar para artigos
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {post.data.title || 'Sem título'}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            {post.data.date && (
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{new Date(post.data.date).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
            {post.data.category && (
              <div className="flex items-center gap-2">
                <span>🏷️</span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full">{post.data.category}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>{post.data.author || 'Dr. Carlos Silva'}</span>
            </div>
          </div>
        </div>
      </section>

      {post.data.image && (
        <section className="py-8 bg-white">
          <div className="container-custom">
            <img src={post.data.image} alt={post.data.title} className="w-full rounded-2xl shadow-2xl" />
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          {post.data.description && (
            <div className="mb-8 p-6 bg-gray-50 border-l-4 border-accent rounded-r-lg">
              <p className="text-lg text-gray-700 italic">{post.data.description}</p>
            </div>
          )}

          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link to="/blog" className="text-accent hover:text-primary">← Todos os artigos</Link>
          </div>
        </div>
      </section>

      <WhatsAppButton whatsapp={content.whatsapp} />
      <Footer siteName={content.siteName} oab={content.oab} phone={content.phone} email={content.email} address={content.address} whatsapp={content.whatsapp} />
    </div>
  );
}