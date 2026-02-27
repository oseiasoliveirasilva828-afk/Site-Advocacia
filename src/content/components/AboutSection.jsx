export default function AboutSection({ lawyerName, lawyerBio, lawyerPhoto, experience, cases, specializations }) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Gallery */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={lawyerPhoto}
                alt={lawyerName}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-2xl z-20 animate-float">
              <p className="text-4xl font-bold text-primary">{experience}+</p>
              <p className="text-gray-600">Anos de experiência</p>
            </div>
            
            <div className="absolute -top-8 -left-8 bg-white p-6 rounded-xl shadow-2xl z-20 animate-float" style={{ animationDelay: '1s' }}>
              <p className="text-4xl font-bold text-primary">{cases}+</p>
              <p className="text-gray-600">Casos bem-sucedidos</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-2xl transform rotate-3"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <span className="text-accent font-semibold tracking-wider uppercase">Sobre o advogado</span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">{lawyerName}</h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {lawyerBio}
            </p>

            {/* Specializations Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {(specializations || [
                { icon: "⚖️", title: "Direito Civil" },
                { icon: "📄", title: "Direito Trabalhista" },
                { icon: "🔒", title: "Direito Criminal" },
                { icon: "🏛️", title: "Direito Empresarial" }
              ]).map((spec, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 group"
                >
                  <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">
                    {spec.icon}
                  </span>
                  <h3 className="font-semibold text-primary">{spec.title}</h3>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex gap-4 pt-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">OAB/SP 344.956</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Membro da OAB desde 2012</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}