// server-simple.js - Teste básico
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Teste Express Funcionando!</h1>
        <p>Express version: ${require('express/package.json').version}</p>
        <p>Node version: ${process.version}</p>
        <a href="/test">Teste JSON</a>
    `);
});

app.get('/test', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Express funcionando!',
        timestamp: new Date()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de teste rodando em http://localhost:${PORT}`);
});