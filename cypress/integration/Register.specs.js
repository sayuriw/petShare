context('Actions', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('has the right App title', () => {
    cy.title().should('include', 'PetShare')
  })

  it('has four inputs and a button', () => {
    cy.get('input').should('have.length', 4)
    cy.get('button')
      .contains('Register')
      .should('have.length', 1)
  })

  it('Registers a new user', () => {
    cy.get('label')
      .contains('Name')
      .find('input')
      .type('TestUser')
    cy.get('label')
      .contains('Email')
      .find('input')
      .type('test@test.com')
    cy.get('label')
      .contains('Password')
      .find('input')
      .type('xxxxxx')
    cy.get('label')
      .contains('Repeat Password')
      .find('input')
      .type('xxxxxx')
    cy.get('button')
      .contains('Register')
      .click()
      cy.request('http://localhost:3333/users/delete-test-users').then(res => {
        cy.wrap(res.body.success).should('be.true')
      })
  })
})
