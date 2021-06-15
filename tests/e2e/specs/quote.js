import authUser from '../fixtures/auth-user.json'

let listingCount

describe('manage Clients', () => {
    before(() => {
        const {email, password} = authUser
        cy.visit('http://localhost:8080/')
        cy.logout()
        cy.get('[input-email-login]').type(email)
        cy.get('[input-password-login]').type(password)
        cy.get('[btn-login-login]').click()
        cy.get(':nth-child(1) > a > .home-tile')
            .contains('Cotizaciones')
            .click()
    })

    it('Should click on quotes button and see a list', () => {
        cy.get('tbody')
            .find('tr')
            .then(listing => {
                listingCount = Cypress.$(listing).length
                expect(listing).to.have.length(listingCount)
            })
    })
    describe('Manage new quote', () => {
        it('Should click on add and visit document/new/quote', () => {
            cy.get('[button-new-quote]').click()
            cy.contains('COTIZACION')
        })
        it('Should open the selector and pick Brewthers', () => {
            cy.get('[select-client-document]').click()
            cy.wait(500)
            cy.get('.q-menu')
                .contains('Brewthers')
                .click()
        })
        it('Should type item name, desc, price and amount', () => {
            cy.get('[input-name-document="0"]').type('Test item #1')
            cy.get('[input-desc-document="0"]').type('Test optional item #1')
            cy.get('[input-price-document="0"]').type('10')
            cy.get('[input-amount-document="0"]').type('2')
        })
        it('Should click on add item', () => {
            cy.get('[button-newitem-document]').click()
        })
        it('Should type item name, desc, price and amount for item #2', () => {
            cy.get('[input-name-document="1"]').type('Test item #2')
            cy.get('[input-desc-document="1"]').type('Test optional item #2')
            cy.get('[input-price-document="1"]').type('20')
            cy.get('[input-amount-document="1"]').type('4')
        })
        it('Should click on add item again', () => {
            cy.get('[button-newitem-document]').click()
        })
        it('Should delete this new item', () => {
            cy.get('[button-deleteitem-document="2"]').click()
            cy.get('Item 3').should('not.exist')
        })
        it('Should add some notes', () => {
            cy.get('[aria-label="Notes"]').type('Lorem Ipsum Dolore')
        })
        it('Should save the new quote', () => {
            cy.get('[button-savedocument-document]')
                .contains('span', 'Guardar')
                .click()
        })
    })
    describe('Should Analize the document', () => {
        it('Should check client, balance, total, items, desc, price and amount', () => {
            cy.get('[div-clientname-document]').contains('Brewthers')
            cy.get('[div-quotebalance-document]').contains(' $ 100.00 ')
            cy.get('[div-name-document="0"]').contains(' TEST ITEM #1 ')
            cy.get('[div-desc-document="0"]').contains('Test optional item #1')
            cy.get('[div-price-document="0"]').contains(' $ 10.00 ')
            cy.get('[div-amount-document="0"]').contains(' 2 ')
            cy.get('[div-subtotal-document="0"]').contains(parseFloat(10 * 2).toFixed(2))
            cy.get('[div-name-document="1"]').contains(' TEST ITEM #2 ')
            cy.get('[div-desc-document="1"]').contains('Test optional item #2')
            cy.get('[div-price-document="1"]').contains(' $ 20.00 ')
            cy.get('[div-amount-document="1"]').contains(' 4 ')
            cy.get('[div-subtotal-document="1"]').contains(parseFloat(20 * 4).toFixed(2))
            cy.get('[div-total-document]').contains('$ 100.00')
            cy.get('[div-notes-document]').contains('Lorem Ipsum Dolore')
        })
    })
    describe('Should check quote list', () => {
        it('Should go back to /quotes', () => {
            cy.get('[btn-goback-document]')
                .contains('span', 'Atrás')
                .click()
            cy.get(':nth-child(1) > a > .home-tile')
                .contains('Cotizaciones')
                .click()
        })
        it('Should check the list and see a new entry ', () => {
            cy.get('tbody')
                .find('tr')
                .then(listing => {
                    expect(listing).to.have.length(listingCount + 1)
                })
        })
    })
    // it('Should delete the new register', () => {
    //     cy.contains('Test Company')
    //     cy.contains('test@gmail.com')
    //     cy.contains('6666-6666')
    //     cy.get('[delete-button="Test Company"]').click()
    //     cy.get('tbody')
    //         .find('tr')
    //         .then(listing => {
    //             listingCount = Cypress.$(listing).length
    //             expect(listing).to.have.length(listingCount)
    //         })
    // })
})
