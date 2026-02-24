// api/auth.js
export default function handler(req, res) {
  const { code } = req.query;
  
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Se for OPTIONS (preflight), retorna ok
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Se for o callback com código
  if (code) {
    // Redireciona para o admin com o token
    const redirectUrl = `/admin/#access_token=${code}`;
    console.log('Redirecionando para:', redirectUrl);
    res.redirect(redirectUrl);
    return;
  }

  // Se for erro
  if (req.query.error) {
    console.error('Erro do GitHub:', req.query.error);
    res.redirect(`/admin/#error=${req.query.error}`);
    return;
  }

  // Inicia o fluxo OAuth
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = 'https://site-advocacia-one.vercel.app/api/auth';
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`;
  
  console.log('Redirecionando para GitHub:', authUrl);
  res.redirect(authUrl);
}