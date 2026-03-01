import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from '/src/utils/contentLoader';
import '../styles/animations.css';

// Função para extrair ID do YouTube
function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Renderizar vídeo de destaque
function renderFeaturedVideo(videoData) {
  if (!videoData) return null;
  
  try {
    // Se for string, tenta parsear JSON
    const data = typeof videoData === 'string' ? JSON.parse(videoData) : videoData;
    
    if (data.type === 'youtube' && data.url) {
      const videoId = extractYouTubeId(data.url);
      if (videoId) {
        return (
          <div className="mb-8">
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                style={{ border: 0 }}
                allowFullScreen
                title="Vídeo do artigo"
              />
            </div>
            {data.caption && (
              <p className="text-center text-sm text-gray-500 mt-2">{data.caption}</p>
            )}
          </div>
        );
      }
    } else if (data.type === 'upload' && data.file) {
      return (
        <div className="mb-8">
          <video
            controls
            className="w-full rounded-lg shadow-lg"
            style={{ maxHeight: '500px' }}
          >
            <source src={data.file} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
          {data.caption && (
            <p className="text-center text-sm text-gray-500 mt-2">{data.caption}</p>
          )}
        </div>
      );
    }
  } catch (e) {
    console.error('Erro ao processar vídeo:', e);
  }
  
  return null;
}

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => {
  const youtubeId = extractYouTubeId(href);
  if (youtubeId) {
    return `
      <div style="position: relative; padding-bottom: 56.25%; height: 0; margin: 20px 0;">
        <iframe src="https://www.youtube.com/embed/${youtubeId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
      </div>
    `;
  }
  if (href.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return `
      <video controls style="width: 100%; max-height: 500px; margin: 20px 0;">
        <source src="${href}" type="video/mp4">
      </video>
    `;
  }
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
};

renderer.image = (href, title, text) => {
  return `<img src="${href}" alt="${text || ''}" loading="lazy" style="max-width: 100%; height: auto; margin: 20px 0;" />`;
};

marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer
});

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: text };

  const data = {};
  match[1].split('\n').forEach((line) => {
    if (line.includes(': ')) {
      const [key, ...value] = line.split(': ');
      let val = value.join(': ').trim();
      if (val.startsWith('{') && val.endsWith('}')) {
        try {
          val = JSON.parse(val);
        } catch (e) {}
      }
      data[key.trim()] = val;
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
        setContent(prev => ({ ...prev, ...settingsData?.data }));

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
        setTimeout(() => setLoading(false), 800);
      }
    }

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-primary">
        <Header {...content} />
        <div className="h-24"></div>
        <div className="text-center text-white py-20">
          <h1 className="text-4xl font-bold text-accent mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="bg-accent text-primary px-6 py-3 rounded-full">← Voltar</Link>
        </div>
        <Footer {...content} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header {...content} />

      <section className="bg-gradient-to-r from-primary to-secondary text-white pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.data.title}</h1>
          {post.data.description && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto">{post.data.description}</p>
          )}
        </div>
      </section>

      <main className="container-custom max-w-4xl px-4 py-8">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent mb-6">
          <i className="fas fa-arrow-left"></i> Todos os artigos
        </Link>

        {/* 🔥 VÍDEO DE DESTAQUE */}
        {post.data.featured_video && renderFeaturedVideo(post.data.featured_video)}

        {/* Imagem de destaque (se não tiver vídeo) */}
        {!post.data.featured_video && post.data.image && (
          <img src={post.data.image} alt={post.data.title} className="w-full rounded-lg shadow-lg mb-6" />
        )}

        <article 
          ref={articleRef}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
        />
      </main>

      <WhatsAppButton whatsapp={content.whatsapp} />
      <Footer {...content} />
    </div>
  );
}