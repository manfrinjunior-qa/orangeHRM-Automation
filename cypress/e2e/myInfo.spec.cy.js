describe('Menu MY Info - OrangeHRM', () => {

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
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard');
  });


  it('Deve acessar o menu My Info', () => {
    cy.get(':nth-child(6) > .oxd-main-menu-item').click();
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'My Info');
    cy.get('.orangehrm-edit-employee-content > :nth-child(1) > .oxd-text--h6').should('contain', 'Personal Details');
  });

})