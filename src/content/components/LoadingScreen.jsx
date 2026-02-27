export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl text-accent">⚖️</span>
          </div>
        </div>
        <p className="text-white text-xl font-light tracking-wider animate-pulse">
          Carregando...
        </p>
      </div>
    </div>
  );
}