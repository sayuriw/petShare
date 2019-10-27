context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has the right App title', () => {
    cy.title().should('include', 'PetShare')
  })

  it('Links to the registerPage', () => {
    cy.get('p')
    .contains('Not registered yet?')
    cy.get('a')
      .should('have.attr', 'href', '/register')
  })

  it('has two inputs and a button', () => {
    cy.get('input').should('have.length', 2)
    cy.get('button')
      .contains('Login')
      .should('have.length', 1)
  })

  it('logs the user in', () => {
    cy.get('label')
      .contains('Email')
      .find('input')
      .type('xxx@de.com')
    cy.get('label')
      .contains('Password')
      .find('input')
      .type('xxxxxx')
    cy.get('button')
      .contains('Login')
      .click()
  })
})
