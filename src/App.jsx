import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./content/pages/Home";
import Blog from "./content/pages/Blog";
import Post from "./content/pages/Post";
import Sobre from "./content/pages/Sobre";
import Contato from "./content/pages/Contato";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        {/* NÃO colocar rota para /admin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;