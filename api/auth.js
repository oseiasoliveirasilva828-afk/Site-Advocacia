// api/auth.js
export default function handler(req, res) {
  // Callback do GitHub
  if (req.query.code) {
    // Redireciona para o admin com o código
    res.redirect(`/admin/#access_token=${req.query.code}`);
    return;
  }
  
  // Inicia o fluxo OAuth
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = 'https://site-advocacia.vercel.app/api/auth';
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`;
  
  res.redirect(authUrl);
}