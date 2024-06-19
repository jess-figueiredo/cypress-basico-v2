/// <reference types="Cypress" />


// Seção 2: Seu primeiro teste escrito com Cypress
describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => cy.visit('./src/index.html'))

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

// Seção 3: Localizando, digitando e clicando em elementos
    it('Preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'teste teste teste teste teste testes teste teste teste teste teste testesteste teste teste teste teste testes teste teste teste teste teste testes teste teste teste teste teste testes'
        cy.get('#firstName').type('Jéssica')
        cy.get('#lastName').type('Figueiredo')
        cy.get('#email').type('jhessikafeitosa@hotmail.com.br')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('.button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Jéssica')
        cy.get('#lastName').type('Figueiredo')
        cy.get('#email').type('jhessikafeitosa@hotmail.com,br')
        cy.get('#open-text-area').type('teste')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo de telefone continua vazio quando preenchido com o valor não-numérico', function () {
        cy.get('#phone').type('abcdefgijk').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').type('Jéssica')
        cy.get('#lastName').type('Figueiredo')
        cy.get('#email').type('jhessikafeitosa@hotmail.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Jéssica').should('have.value', 'Jéssica').clear().should('have.value', '')
        cy.get('#lastName').type('Figueiredo').should('have.value', 'Figueiredo').clear().should('have.value', '')
        cy.get('#email').type('jhessikafeitosa@hotmail.com.br').should('have.value', 'jhessikafeitosa@hotmail.com.br').clear().should('have.value', '')
        cy.get('#open-text-area').type('teste').should('have.value', 'teste').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.clock()

        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(3000)

        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

// Seção 4: Selecionando opções em campos de seleção suspensa

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    
// Seção 5: Marcando inputs do tipo radio

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

// Seção 6: Marcando e desmarcando inputs do tipo checkbox

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

// Seção 7: Fazendo upload de arquivos com Cypress

    //Métodos de testes do vídeo "Conheça a funcionalidade .selectFile, disponível na versão 9.3.0 do Cypress"
    it('selects a file for upload', () => {
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .then( input =>{
            expect (input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selects a file for upload simulating a drag-and-drop', () => {
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .then( input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selects a file for upload using an aliased fixture', () => {
        cy.fixture('example.json', {encoding: null}).as('exampleFile')
        cy.get('input[type="file"]')
        .selectFile('@exampleFile')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('select multiple files for upload', () => {
        cy.get('input[type="file"]')
        .selectFile([
            'cypress/fixtures/example.json',
            'cypress/fixtures/example.txt'
        ])
    })
//Fim dos métodos de testes do vídeo "Conheça a funcionalidade .selectFile, disponível na versão 9.3.0 do Cypress"

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
// Seção 8: Lidando com links que abrem em outra aba do navegador
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing')
            .should('be.visible')
    })
//seção 12: Avançando no uso do Cypress
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('Preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('teste ', 50)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
      })

      it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
      })

      it.only('encontra o gato escondido', () => {
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')

        cy.get('#title')
        .invoke('text', 'CAC TAT')

        cy.get('#subtitle')
        .invoke('text', 'Eu 💚 Gatos')
      })
})


