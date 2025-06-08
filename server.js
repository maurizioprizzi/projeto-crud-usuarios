// =============================================================================
// 6. SERVER.JS - Arquivo principal da aplicação
// =============================================================================
const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');

// Importações locais
const database = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        
        this.initializeDatabase();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    async initializeDatabase() {
        try {
            await database.connect();
        } catch (error) {
            console.error('Falha ao conectar com o banco de dados:', error);
            process.exit(1);
        }
    }

    setupMiddlewares() {
        // Configuração do Handlebars
        this.app.engine('hbs', engine({
            extname: '.hbs',
            defaultLayout: 'main',
            layoutsDir: path.join(__dirname, 'views/layouts'),
            partialsDir: path.join(__dirname, 'views/partials'),
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
            helpers: {
                // Helper para formatar CPF
                formatCpf: function(cpf) {
                    if (!cpf) return '';
                    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                },
                // Helper para verificar igualdade
                eq: function(a, b) {
                    return a === b;
                },
                // Helper para formatar data
                formatDate: function(date) {
                    if (!date) return '';
                    const d = new Date(date);
                    return d.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                },
                // Helper para pegar substring
                substring: function(str, start, end) {
                    if (!str) return '';
                    return str.substring(start, end).toUpperCase();
                },
                // Helper para JSON stringify (debug)
                json: function(context) {
                    return JSON.stringify(context, null, 2);
                }
            }
        }));
        
        this.app.set('view engine', 'hbs');
        this.app.set('views', path.join(__dirname, 'views'));

        // Middlewares gerais
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(methodOverride('_method')); // Para usar PUT e DELETE em forms
        
        // Middleware de log
        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
            next();
        });
    }

    setupRoutes() {
        this.app.use('/', usuarioRoutes);
        
        // Rota 404
        this.app.use('*', (req, res) => {
            res.status(404).render('index', {
                title: 'Página não encontrada',
                error: 'A página que você procura não existe.'
            });
        });
    }

    setupErrorHandling() {
        // Middleware de tratamento de erros
        this.app.use((err, req, res, next) => {
            console.error('Erro não tratado:', err);
            res.status(500).render('index', {
                title: 'Erro interno',
                error: 'Ocorreu um erro interno no servidor.'
            });
        });
    }

    async start() {
        try {
            this.app.listen(this.port, () => {
                console.log(`🚀 Servidor rodando em http://localhost:${this.port}`);
                console.log('📋 Rotas disponíveis:');
                console.log('   GET  /              - Página inicial');
                console.log('   GET  /cadastro      - Formulário de cadastro');
                console.log('   POST /usuarios      - Criar usuário');
                console.log('   GET  /usuarios      - Listar usuários');
                console.log('   GET  /usuarios/:cpf/editar - Editar usuário');
                console.log('   PUT  /usuarios/:cpf - Atualizar usuário');
                console.log('   DELETE /usuarios/:cpf - Deletar usuário');
            });
        } catch (error) {
            console.error('Erro ao iniciar servidor:', error);
            process.exit(1);
        }
    }

    async shutdown() {
        console.log('🛑 Encerrando aplicação...');
        await database.disconnect();
        process.exit(0);
    }
}

// Inicialização da aplicação
const app = new App();

// Tratamento de sinais do sistema
process.on('SIGINT', () => app.shutdown());
process.on('SIGTERM', () => app.shutdown());

// Inicia o servidor
app.start();

module.exports = app;