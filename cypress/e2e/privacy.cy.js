describe('testa a página da política de privacidade de forma independente', () => {
  beforeEach(()=> {cy.visit('./src/privacy.html')})

  it('testa a página da política de privacidade de forma independente', () =>{
    cy.contains('Talking About Testing')
            .should('be.visible')
  })
})