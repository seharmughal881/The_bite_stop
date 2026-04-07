// Netlify Function
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

app.use(cors());
app.use(express.json());

// Your API routes here
app.get('/.netlify/functions/api/health', (req, res) => {
  res.json({ status: 'success', message: 'API is healthy' });
});

module.exports.handler = serverless(app);
