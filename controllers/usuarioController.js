// =============================================================================
// 4. CONTROLLERS/USUARIOCONTROLLER.JS - Lógica de negócio
// =============================================================================
const Usuario = require('../models/Usuario');

class UsuarioController {
    
    // GET / - Página inicial
    async index(req, res) {
        try {
            res.render('index', { 
                title: 'Sistema de Usuários',
                message: 'Bem-vindo ao sistema de gerenciamento de usuários!'
            });
        } catch (error) {
            res.status(500).render('index', { 
                title: 'Erro',
                error: 'Erro interno do servidor' 
            });
        }
    }

    // GET /cadastro - Formulário de cadastro
    async mostrarFormularioCadastro(req, res) {
        try {
            res.render('cadastro', { 
                title: 'Cadastrar Usuário'
            });
        } catch (error) {
            res.status(500).render('cadastro', { 
                title: 'Erro',
                error: 'Erro ao carregar formulário' 
            });
        }
    }

    // POST /usuarios - Criar usuário
    async criar(req, res) {
        try {
            const { nome, cpf } = req.body;
            
            // Validação básica
            if (!nome || !cpf) {
                return res.status(400).render('cadastro', {
                    title: 'Cadastrar Usuário',
                    error: 'Nome e CPF são obrigatórios',
                    nome, cpf
                });
            }

            await Usuario.criar({ nome, cpf });
            
            res.render('cadastro', {
                title: 'Cadastrar Usuário',
                success: `Usuário ${nome} cadastrado com sucesso!`
            });

        } catch (error) {
            res.status(400).render('cadastro', {
                title: 'Cadastrar Usuário',
                error: error.message,
                nome: req.body.nome,
                cpf: req.body.cpf
            });
        }
    }

    // GET /usuarios - Listar todos os usuários
    async listar(req, res) {
        try {
            const usuarios = await Usuario.listarTodos();
            
            res.render('listar', {
                title: 'Lista de Usuários',
                usuarios: usuarios,
                total: usuarios.length
            });

        } catch (error) {
            res.status(500).render('listar', {
                title: 'Lista de Usuários',
                error: 'Erro ao carregar usuários',
                usuarios: []
            });
        }
    }

    // GET /usuarios/:cpf/editar - Formulário de edição
    async mostrarFormularioEdicao(req, res) {
        try {
            const { cpf } = req.params;
            const usuario = await Usuario.buscarPorCpf(cpf);
            
            if (!usuario) {
                return res.status(404).render('editar', {
                    title: 'Editar Usuário',
                    error: 'Usuário não encontrado'
                });
            }

            res.render('editar', {
                title: 'Editar Usuário',
                usuario: usuario
            });

        } catch (error) {
            res.status(500).render('editar', {
                title: 'Editar Usuário',
                error: 'Erro ao carregar usuário'
            });
        }
    }

    // PUT /usuarios/:cpf - Atualizar usuário
    async atualizar(req, res) {
        try {
            const { cpf } = req.params;
            const { nome } = req.body;

            if (!nome) {
                const usuario = await Usuario.buscarPorCpf(cpf);
                return res.status(400).render('editar', {
                    title: 'Editar Usuário',
                    error: 'Nome é obrigatório',
                    usuario: usuario
                });
            }

            const usuarioAtualizado = await Usuario.atualizar(cpf, { nome });
            
            if (!usuarioAtualizado) {
                return res.status(404).render('editar', {
                    title: 'Editar Usuário',
                    error: 'Usuário não encontrado'
                });
            }

            res.render('editar', {
                title: 'Editar Usuário',
                usuario: usuarioAtualizado,
                success: 'Usuário atualizado com sucesso!'
            });

        } catch (error) {
            const usuario = await Usuario.buscarPorCpf(req.params.cpf);
            res.status(400).render('editar', {
                title: 'Editar Usuário',
                error: error.message,
                usuario: usuario
            });
        }
    }

    // DELETE /usuarios/:cpf - Deletar usuário
    async deletar(req, res) {
        try {
            const { cpf } = req.params;
            const usuarioDeletado = await Usuario.deletar(cpf);
            
            if (!usuarioDeletado) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Usuário não encontrado' 
                });
            }

            // Redireciona para a lista após deletar
            res.redirect('/usuarios');

        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Erro ao deletar usuário: ' + error.message 
            });
        }
    }

    // GET /usuarios/:cpf - Buscar usuário específico
    async buscar(req, res) {
        try {
            const { cpf } = req.params;
            const usuario = await Usuario.buscarPorCpf(cpf);
            
            if (!usuario) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Usuário não encontrado' 
                });
            }

            res.json({ 
                success: true, 
                usuario: usuario 
            });

        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Erro ao buscar usuário: ' + error.message 
            });
        }
    }
}

module.exports = new UsuarioController();
