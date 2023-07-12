const express = requre('express');
const cors = require('cors');
const recRouter = require('./routes/recommend');
const openaiRoutes= require('./routes/openai')

const app = express();
const PORT = 3000;

app.use(cors({origin: [`http://localhost:${PORT}`, 'https://chat.openai.com']}));
app.use(express.json());