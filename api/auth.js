// api/auth.js
export default function handler(req, res) {
  const { code } = req.query;
  
  // Se for a página de callback
  if (req.url.startsWith('/callback')) {
    // Redireciona de volta para o admin com o código
    res.redirect(`/admin/#access_token=${code}`);
    return;
  }
  
  // Inicia o fluxo OAuth
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.VERCEL_URL || 'http://localhost:5173'}/api/auth/callback`;
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
  
  res.redirect(authUrl);
}