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

context('CreateCard', () => {
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

  it('is a form with all its elements', async () => {
    cy.visit('/newCard')
    cy.get('img').should('to.exist')
    cy.get('input').should('have.length', 3)
    cy.get('textarea').should('have.length', 1)
    cy.get('select').should('have.length', 3)
    cy.get('button')
      .contains('send')
      .should('have.length', 1)
  })

  it('creates a new pet card', async () => {
    cy.visit('/newCard')
    cy.get('label')
      .contains('Title')
      .find('input')
      .type('New test Card')

    cy.get('label')
      .contains('Description')
      .find('textarea')
      .type('Here goes the description text from the user...')

    cy.get('label')
      .parent()
      .contains('Picture')
      .parent()
      .find('input')

    cy.get('label')
      .contains('Email')
      .find('input')
      .type('xxx@test.de')

    cy.get('label')
      .contains('Type')
      .find('select')
      .type('Dog')

    cy.get('label')
      .contains('Size')
      .find('select')
      .type('Small')

    cy.get('label')
      .contains('Availability')
      .find('select')
      .type('Flexible')

    cy.get('button')
      .contains('send')
      .click()
    cy.request('http://localhost:3333/cards/delete-test-cards').then(res => {
      cy.wrap(res.body.success).should('be.true')
    })
  })
})
