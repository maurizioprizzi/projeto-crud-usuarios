// =============================================================================
// 3. MODELS/USUARIO.JS - Modelo de dados usando OOP
// =============================================================================
const mongoose = require('mongoose');

class UsuarioModel {
    constructor() {
        // Schema do usuário
        this.schema = new mongoose.Schema({
            cpf: {
                type: String,
                required: [true, 'CPF é obrigatório'],
                unique: true,
                trim: true,
                validate: {
                    validator: function(cpf) {
                        // Validação simples de CPF (apenas números e 11 dígitos)
                        return /^\d{11}$/.test(cpf.replace(/\D/g, ''));
                    },
                    message: 'CPF deve conter 11 dígitos'
                }
            },
            nome: {
                type: String,
                required: [true, 'Nome é obrigatório'],
                trim: true,
                minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
                maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
            }
        }, {
            timestamps: true // Adiciona createdAt e updatedAt automaticamente
        });

        // Middleware para formatar CPF antes de salvar
        this.schema.pre('save', function(next) {
            // Remove caracteres não numéricos do CPF
            this.cpf = this.cpf.replace(/\D/g, '');
            next();
        });

        // Método para formatar CPF na exibição
        this.schema.methods.getCpfFormatado = function() {
            return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        };

        // Método estático para buscar por CPF
        this.schema.statics.buscarPorCpf = function(cpf) {
            const cpfLimpo = cpf.replace(/\D/g, '');
            return this.findOne({ cpf: cpfLimpo });
        };

        this.model = mongoose.model('Usuario', this.schema);
    }

    // Métodos CRUD encapsulados
    async criar(dadosUsuario) {
        try {
            const usuario = new this.model(dadosUsuario);
            return await usuario.save();
        } catch (error) {
            throw this._tratarErro(error);
        }
    }

    async listarTodos() {
        try {
            return await this.model.find({}).sort({ nome: 1 });
        } catch (error) {
            throw this._tratarErro(error);
        }
    }

    async buscarPorCpf(cpf) {
        try {
            return await this.model.buscarPorCpf(cpf);
        } catch (error) {
            throw this._tratarErro(error);
        }
    }

    async atualizar(cpf, novosDados) {
        try {
            const cpfLimpo = cpf.replace(/\D/g, '');
            return await this.model.findOneAndUpdate(
                { cpf: cpfLimpo }, 
                novosDados, 
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw this._tratarErro(error);
        }
    }

    async deletar(cpf) {
        try {
            const cpfLimpo = cpf.replace(/\D/g, '');
            return await this.model.findOneAndDelete({ cpf: cpfLimpo });
        } catch (error) {
            throw this._tratarErro(error);
        }
    }

    // Método privado para tratar erros
    _tratarErro(error) {
        if (error.code === 11000) {
            return new Error('CPF já está cadastrado no sistema');
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return new Error(messages.join(', '));
        }
        return error;
    }
}

module.exports = new UsuarioModel();
