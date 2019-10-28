context.only('Cards list Page', () => {
  before(() => {
    cy.visit('/')
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
  
  it('has filters', () => {
    cy.get('button')
      .contains('filter')
    })
  
  it('has some cards', ()=> {
    cy.get('img')
      .should('to.exist')
    cy.get('h3')
      .should('have.length.gt', 3)
    cy.get('p')
      .should('have.length.gt', 3)
      cy.get('a')
      .should('have.attr', 'href')
  })
  it('has a Navigation', () => {
    cy.get('nav').should('have.length', 1)
  }) 
    })