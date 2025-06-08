// =============================================================================
// 5. ROUTES/USUARIOROUTES.JS - Definição das rotas
// =============================================================================
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rotas da aplicação
router.get('/', usuarioController.index);
router.get('/cadastro', usuarioController.mostrarFormularioCadastro);
router.post('/usuarios', usuarioController.criar);
router.get('/usuarios', usuarioController.listar);
router.get('/usuarios/:cpf/editar', usuarioController.mostrarFormularioEdicao);
router.put('/usuarios/:cpf', usuarioController.atualizar);
router.delete('/usuarios/:cpf', usuarioController.deletar);
router.get('/usuarios/:cpf', usuarioController.buscar);

router.get('/debug', async (req, res) => {
    try {
        const Usuario = require('../models/Usuario');
        const usuarios = await Usuario.listarTodos();
        
        res.json({
            message: 'Debug de usuários',
            total: usuarios.length,
            usuarios: usuarios.map(u => ({
                nome: u.nome,
                cpf: u.cpf,
                cpfFormatado: u.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
                createdAt: u.createdAt,
                id: u._id
            }))
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;