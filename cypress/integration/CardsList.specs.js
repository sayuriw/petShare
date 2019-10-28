const cyLocalStorage = {}
Cypress.Commands.add('login', () => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:3333/Users/login',
      body: {
        email: 'xxx@de.com',
        password: 'xxxxxx'
      }
    })
    .then(resp => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          token: resp.body.token,
          userId: resp.body.userId
        })
      )
    })
})
context('Cardslist Page', () => {
  before(() => {
    cyLocalStorage.clearLocalStorage = cy.clearLocalStorage
    cy.clearLocalStorage = () => {}
  })
  after(() => {
    cy.clearLocalStorage = cyLocalStorage.clearLocalStorage
  })
  beforeEach(() => {
    cy.visit('/')
    cy.login()
  })
  
  it('has a header', async () => {
    cy.visit('/home')
    cy.get('img')
      .should('to.exist')
    cy.get('button')
      .contains('Filter')
  })
  it('has some cards', async ()=> {
    cy.visit('/')
    cy.get('img')
      .should('to.exist')
    cy.get('h3')
      .should('have.length.gt', 3)
    cy.get('p')
      .should('have.length.gt', 3)
      cy.get('a')
      .should('have.attr', 'href')
  })
  it('has a Navigation', async () => {
    cy.visit('/')
    cy.get('nav').should('have.length', 1)
  }) 
     })