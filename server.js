const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Pour gérer les requêtes cross-origin (CORS)

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors());

// Clé API Hugging Face (remplace par ta clé Hugging Face)
const HUGGINGFACE_API_KEY = 'ton_token_hugging_face';

const headers = {
    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
};

// Route pour générer du texte avec GPT-2
app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;

    if (!prompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            {
                inputs: prompt,
            },
            { headers }
        );

        const generatedText = response.data[0].generated_text;
        res.json({ generated_text: generatedText });
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({ error: 'Error generating text from Hugging Face' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
