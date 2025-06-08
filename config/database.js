// =============================================================================
// 2. CONFIG/DATABASE.JS - Configuração do MongoDB
// =============================================================================
const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connection = null;
    }

    async connect() {
        try {
            // Conecta ao MongoDB local
            this.connection = await mongoose.connect('mongodb://localhost:27017/crud_usuarios', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            
            console.log('✅ Conectado ao MongoDB com sucesso!');
            return this.connection;
        } catch (error) {
            console.error('❌ Erro ao conectar com MongoDB:', error.message);
            process.exit(1);
        }
    }

    async disconnect() {
        if (this.connection) {
            await mongoose.disconnect();
            console.log('🔌 Desconectado do MongoDB');
        }
    }
}

module.exports = new Database();