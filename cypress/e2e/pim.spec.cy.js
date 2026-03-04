describe('Menu PIM - OrangeHRM', () => {

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


  it('Deve acessar o menu PIM', () => {
    cy.get(':nth-child(2) > .oxd-main-menu-item').click();
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'PIM');
    cy.get('.oxd-table-filter-header-title > .oxd-text').should('contain', 'Employee Information');
  });

})