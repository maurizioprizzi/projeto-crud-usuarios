# 🚀 Sistema CRUD de Usuários

Sistema completo de gerenciamento de usuários desenvolvido com **Node.js**, **Express.js**, **MongoDB** e **Handlebars**.

## ✨ Features

- ✅ **CRUD Completo**: Criar, listar, editar e excluir usuários
- ✅ **Validação de CPF**: Algoritmo completo de validação
- ✅ **Interface Responsiva**: Design moderno com Bootstrap
- ✅ **Formatação Automática**: CPF formatado automaticamente  
- ✅ **Arquitetura MVC**: Código organizado e profissional
- ✅ **MongoDB**: Banco NoSQL para persistência
- ✅ **Handlebars**: Templates dinâmicos

## 🛠️ Tecnologias

- **Backend**: Node.js + Express.js 4.18.2
- **Banco de Dados**: MongoDB + Mongoose 7.6.3
- **Templates**: Handlebars 7.1.2
- **Frontend**: Bootstrap + JavaScript
- **Validações**: JavaScript (cliente/servidor)

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB instalado e rodando
- NPM ou Yarn

## 🚀 Instalação

### 1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/projeto-crud-usuarios.git
cd projeto-crud-usuarios
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configure o MongoDB:
```bash
# Inicie o MongoDB (Linux/Mac)
sudo systemctl start mongod

# Ou no Windows
net start MongoDB
```

### 4. Execute o projeto:
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

### 5. Acesse o sistema:
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
projeto-crud-usuarios/
├── 📄 server.js              # Servidor principal
├── 📄 package.json           # Dependências
├── 📂 config/
│   └── database.js           # Configuração MongoDB
├── 📂 models/
│   └── Usuario.js            # Model do usuário
├── 📂 controllers/
│   └── usuarioController.js  # Lógica de negócio
├── 📂 routes/
│   └── usuarioRoutes.js      # Rotas da aplicação
├── 📂 views/
│   ├── layouts/
│   │   └── main.hbs          # Layout principal
│   ├── cadastro.hbs          # Formulário de cadastro
│   ├── listar.hbs            # Lista de usuários
│   └── editar.hbs            # Formulário de edição
└── 📂 public/
    ├── css/
    │   └── style.css         # Estilos customizados
    └── js/
        └── app.js            # JavaScript frontend
```

## 🔧 Scripts Disponíveis

```bash
# Iniciar servidor (produção)
npm start

# Iniciar com auto-reload (desenvolvimento)
npm run dev

# Verificar dependências
npm list
```

## 📊 Funcionalidades

### 👤 Gerenciamento de Usuários

- **Cadastrar**: Adicionar novos usuários com validação
- **Listar**: Visualizar todos os usuários cadastrados
- **Editar**: Modificar dados de usuários existentes
- **Excluir**: Remover usuários do sistema

### ✅ Validações

- **CPF**: Validação completa com algoritmo oficial
- **Campos Obrigatórios**: Nome e CPF são obrigatórios
- **Formatação**: CPF automaticamente formatado (000.000.000-00)
- **Duplicação**: Impede CPFs duplicados

### 🎨 Interface

- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Animações Suaves**: Hover effects e transições
- **Feedback Visual**: Alertas de sucesso/erro
- **Navegação Intuitiva**: UX/UI profissional

## 🚀 Deploy

### Heroku
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login no Heroku
heroku login

# Criar app
heroku create projeto-crud-usuarios

# Configurar MongoDB Atlas
heroku addons:create mongolab

# Deploy
git push heroku main
```

### Docker
```bash
# Build da imagem
docker build -t projeto-crud-usuarios .

# Executar container
docker run -p 3000:3000 projeto-crud-usuarios
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: (https://github.com/maurizioprizzi)
- LinkedIn: (https://www.linkedin.com/in/maurizioprizzi/)
- Email: maurizioprizzi@gmail.com

## 🎯 Próximas Funcionalidades

- [ ] Sistema de autenticação
- [ ] Upload de avatar
- [ ] Export para Excel/PDF
- [ ] API REST endpoints
- [ ] Testes automatizados
- [ ] Dashboard com estatísticas

---

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐