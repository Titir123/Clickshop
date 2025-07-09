// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Forward the request to your n8n webhook
    const n8nResponse = await fetch('https://suchishree0111.app.n8n.cloud/webhook/a6805d25-aac8-4e21-bf3d-b5d581e952e0/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      
      },
      body: JSON.stringify(req.body)
    });

    const data = await n8nResponse.json();
    res.status(n8nResponse.status).json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}