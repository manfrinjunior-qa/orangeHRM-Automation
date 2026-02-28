describe('Menu Admin - OrangeHRM', () => {
  
  // 1. Criamos a função de login aqui dentro, mas fora dos testes
  const realizarLogin = (tipoUsuario) => {
    cy.fixture('usuarios').then((baseDados) => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      
      // Acessando os dados do seu JSON (usando colchetes por causa dos espaços)
      const dados = baseDados[tipoUsuario];
      
      cy.get('[name="username"]').type(baseDados.sucess.user);
      cy.get('[name="password"]').type(baseDados.sucess.password);
      cy.get('.oxd-button').click();
    });
  };

  // 2. Antes de cada teste de Admin, chamamos a função
  beforeEach(() => {
    realizarLogin('Admin Sucess');
  });

  it('Deve acessar a seção de Gerenciamento de Usuários', () => {
    // Aqui você já inicia logado
    cy.get('.oxd-main-menu-item').contains('Admin').click();
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Admin');
  });

  it('Deve validar a presença do botão Add no Admin', () => {
    cy.get('.oxd-main-menu-item').contains('Admin').click();
    cy.get('.oxd-button').should('contain', 'Add');
  });
});