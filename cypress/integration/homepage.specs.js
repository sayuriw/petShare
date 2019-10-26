context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has the right App title', () => {
    cy.title().should('include', 'PetShare')
  })
})
