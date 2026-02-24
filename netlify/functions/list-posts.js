const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    // No Netlify, o caminho correto é /opt/build/repo/src/content/posts
    const possiblePaths = [
      path.join(process.cwd(), 'src/content/posts'),
      path.join('/opt/build/repo', 'src/content/posts'),
      path.join(__dirname, '../../src/content/posts')
    ];
    
    let postsDirectory = null;
    let files = [];
    
    for (const testPath of possiblePaths) {
      try {
        if (fs.existsSync(testPath)) {
          postsDirectory = testPath;
          files = fs.readdirSync(postsDirectory);
          break;
        }
      } catch (e) {
        console.log('Caminho não encontrado:', testPath);
      }
    }
    
    if (!postsDirectory) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Pasta de posts não encontrada' })
      };
    }
    
    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ posts })
    };
  } catch (error) {
    console.log('Erro detalhado:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
