// =============================================================================
// JAVASCRIPT PRINCIPAL - Sistema CRUD Usuários
// Arquivo: public/js/app.js
// =============================================================================

// Namespace da aplicação para evitar conflitos
const CrudApp = {
    
    // Inicialização principal
    init() {
        console.log('🚀 Sistema CRUD carregado');
        this.initComponents();
        this.bindEvents();
    },

    // Inicializar componentes
    initComponents() {
        this.initCpfMask();
        this.initFormValidation();
        this.initTooltips();
        this.initAlerts();
    },

    // Bind de eventos globais
    bindEvents() {
        document.addEventListener('click', this.handleClicks.bind(this));
    },

    // === MÁSCARA DE CPF ===
    initCpfMask() {
        const cpfInputs = document.querySelectorAll('input[name="cpf"], #cpf');
        cpfInputs.forEach(input => {
            input.addEventListener('input', this.formatCpf.bind(this));
        });
    },

    formatCpf(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        // Limitar a 11 dígitos
        valor = valor.substring(0, 11);
        
        // Aplicar máscara: 000.000.000-00
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        
        e.target.value = valor;
    },

    // === VALIDAÇÃO DE FORMULÁRIOS ===
    initFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');
        
        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    // Focar no primeiro campo inválido
                    const firstInvalid = form.querySelector(':invalid');
                    if (firstInvalid) {
                        firstInvalid.focus();
                    }
                }
                form.classList.add('was-validated');
            });
        });
    },

    // === TOOLTIPS DO BOOTSTRAP ===
    initTooltips() {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(tooltip => {
            new bootstrap.Tooltip(tooltip);
        });
    },

    // === GERENCIAMENTO DE ALERTAS ===
    initAlerts() {
        const successAlerts = document.querySelectorAll('.alert-success');
        
        successAlerts.forEach(alert => {
            // Auto-dismiss após 4 segundos
            setTimeout(() => {
                const bsAlert = bootstrap.Alert.getInstance(alert);
                if (bsAlert) {
                    bsAlert.close();
                }
            }, 4000);
            
            // Adicionar animação de entrada
            alert.classList.add('fade-in');
        });
    },

    // === EVENT HANDLERS ===
    handleClicks(e) {
        // Confirmação para exclusão
        if (e.target.classList.contains('btn-delete') || 
            e.target.closest('form')?.action.includes('_method=DELETE')) {
            return this.confirmarExclusao(e);
        }
    },

    confirmarExclusao(e) {
        const form = e.target.closest('form');
        const nome = form?.dataset.nome || 'este usuário';
        const cpf = form?.dataset.cpf || '';
        
        const confirmed = confirm(
            `⚠️ ATENÇÃO!\n\n` +
            `Tem certeza que deseja excluir o usuário "${nome}"?\n` +
            `CPF: ${cpf}\n\n` +
            `Esta ação não pode ser desfeita.`
        );
        
        if (!confirmed) {
            e.preventDefault();
            return false;
        }
        
        return true;
    }
};

// === FUNÇÕES GLOBAIS (para compatibilidade) ===
window.confirmarExclusao = function(cpf, nome) {
    return confirm(
        `⚠️ Tem certeza que deseja excluir o usuário ${nome} (CPF: ${cpf})?\n\n` +
        `Esta ação não pode ser desfeita.`
    );
};

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', () => {
    CrudApp.init();
});

// Disponibilizar globalmente para debug
window.CrudApp = CrudApp;

// === ERROR HANDLING GLOBAL ===
window.addEventListener('error', (e) => {
    console.error('Erro JavaScript:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rejeitada:', e.reason);
});