import { useState } from 'react';

export default function ContactSection({ phone, email, address, whatsapp, instagram, linkedin, facebook }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode integrar com um serviço de email
    console.log('Form submitted:', formData);
    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
  };

  return (
    <section className="py-24 bg-primary text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase">Contato</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Entre em Contato
          </h2>
          <p className="text-white/80 text-lg">
            Estamos prontos para atender você. Tire suas dúvidas ou agende uma consulta 
            através dos canais abaixo ou preenchendo o formulário.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📍</div>
                <h3 className="font-semibold mb-2">Endereço</h3>
                <p className="text-white/70 text-sm">{address}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📞</div>
                <h3 className="font-semibold mb-2">Telefone</h3>
                <p className="text-white/70 text-sm">{phone}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">✉️</div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-white/70 text-sm">{email}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">⏰</div>
                <h3 className="font-semibold mb-2">Horário</h3>
                <p className="text-white/70 text-sm">Segunda a Sexta: 9h às 18h</p>
                <p className="text-white/70 text-sm">Sábado: 9h às 13h</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
              <div className="flex gap-3">
                {[
                  { href: instagram, icon: "📷", label: "Instagram", color: "hover:bg-gradient-to-r from-purple-500 to-pink-500" },
                  { href: linkedin, icon: "💼", label: "LinkedIn", color: "hover:bg-blue-600" },
                  { href: facebook, icon: "f", label: "Facebook", color: "hover:bg-blue-500" },
                  { href: `https://wa.me/${whatsapp}`, icon: "📱", label: "WhatsApp", color: "hover:bg-green-500" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-all ${social.color}`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map or Image */}
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Localização"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white text-primary p-4 rounded-lg shadow-lg">
                <p className="font-semibold">📍 {address}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-primary mb-6">Envie uma mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nome completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mensagem</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                  placeholder="Descreva brevemente sua situação ou dúvida..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-primary py-4 rounded-lg font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}