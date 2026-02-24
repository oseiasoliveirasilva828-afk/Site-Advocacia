// api/auth.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { code, error } = req.query;

  if (error) {
    // Redireciona com erro
    res.setHeader('Content-Type', 'text/html');
    res.send(`<script>window.location.href='/admin/#error=${error}';</script>`);
    return;
  }

  if (code) {
    try {
      // Trocar código por token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
          redirect_uri: 'https://site-advocacia-one.vercel.app/api/auth'
        })
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.error) {
        res.setHeader('Content-Type', 'text/html');
        res.send(`<script>window.location.href='/admin/#error=${tokenData.error}';</script>`);
        return;
      }

      // MÉTODO DIFERENTE: HTML com script que salva o token
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Redirecionando...</title>
        </head>
        <body>
          <script>
            // Salvar token no localStorage
            localStorage.setItem('github_token', '${tokenData.access_token}');
            // Redirecionar para o admin
            window.location.href = '/admin/';
          </script>
        </body>
        </html>
      `);
      return;
    } catch (error) {
      res.setHeader('Content-Type', 'text/html');
      res.send(`<script>window.location.href='/admin/#error=token_exchange_failed';</script>`);
      return;
    }
  }

  // Iniciar fluxo OAuth
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = 'https://site-advocacia-one.vercel.app/api/auth';
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`;
  
  res.redirect(authUrl);
}