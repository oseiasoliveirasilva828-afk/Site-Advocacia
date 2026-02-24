const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/posts');
    const files = fs.readdirSync(postsDirectory);
    
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao listar posts' })
    };
  }
};
