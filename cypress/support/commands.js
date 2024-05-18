Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Jéssica')
    cy.get('#lastName').type('Figueiredo')
    cy.get('#email').type('jhessikafeitosa@hotmail.com.br')
    cy.get('#open-text-area').type('teste')
    cy.contains('.button', 'Enviar').click()
})
