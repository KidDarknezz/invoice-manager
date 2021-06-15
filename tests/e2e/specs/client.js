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
    })

    it('Should click on clients button and see a list', () => {
        cy.get(':nth-child(3) > a > .home-tile')
            .contains('Clientes')
            .click()
        cy.get('tbody')
            .find('tr')
            .then(listing => {
                listingCount = Cypress.$(listing).length
                expect(listing).to.have.length(listingCount)
            })
    })
    it('Should click on clients button and add a new client', () => {
        cy.get('[input-companyName-clients]').type('Test Company')
        cy.get('[input-companyEmail-clients]').type('test@gmail.com')
        cy.get('[input-companyPhone-clients]').type('6666-6666')
        cy.get('[btn-company-clients]').click()
        cy.wait(200)
        cy.get('tbody')
            .find('tr')
            .should('have.length', listingCount + 1)
    })
    // it('Should click on clients and see a list', () => {
    //     cy.get(':nth-child(3) > a > .home-tile')
    //         .contains('Clientes')
    //         .click()
    // })
})
