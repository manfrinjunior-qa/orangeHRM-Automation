describe('Access Login', () => {

    let baseDados; // Variável para armazenar os dados

    beforeEach(() => {
      // Carrega a fixture e salva o conteúdo na variável 'user'
      cy.fixture('usuarios').then((t) => {
        baseDados = t;
      });
    });

  it('Access Success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type(baseDados.sucess.user);
    cy.get('[name="password"]').type(baseDados.sucess.password);
    cy.get('.oxd-button').click()
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard');
  })

  it('Access fail - Password Invalid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type(baseDados.invalido.user);
    cy.get('[name="password"]').type(baseDados.invalido.password)
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert-content > .oxd-text').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('Access fail - Username Invalid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type(baseDados.invalido.user);
    cy.get('[name="password"]').type(baseDados.invalido.password)
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert-content > .oxd-text').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('Reset Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.orangehrm-login-forgot > .oxd-text').click()
    cy.get('.oxd-text--h6').should('contain', 'Reset Password');
    cy.get('[name="username"]').type(baseDados.reset.user);
    cy.get('.oxd-button--secondary').click();
    cy.get('.oxd-text--h6').should('contain', 'Reset Password link sent successfully')
  });

  it('Cancel Button', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.orangehrm-login-forgot > .oxd-text').click()
    cy.get('.oxd-text--h6').should('contain', 'Reset Password');
    cy.get('.oxd-button--ghost').click();
    cy.get('.oxd-text--h5').should('contain', 'Login');
  });

})