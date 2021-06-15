import authUser from '../fixtures/auth-user.json'

let listingCount

describe('manage Clients', () => {
    before(() => {
        cy.populateUsers()
        const {email, password} = authUser
        cy.visit('http://localhost:8080/')
        cy.logout()
        cy.get('[input-email-login]').type(email)
        cy.get('[input-password-login]').type(password)
        cy.get('[btn-login-login]').click()
        cy.get(':nth-child(3) > a > .home-tile')
            .contains('Clientes')
            .click()
    })
    after(() => {
        cy.logout()
    })
    it('Should click on clients button and see a list', () => {
        cy.get('tbody')
            .find('tr')
            .then(listing => {
                listingCount = Cypress.$(listing).length
                expect(listing).to.have.length(listingCount)
            })
    })
    it('Should add a new client', () => {
        cy.get('[input-companyName-clients]').type('Test Company')
        cy.get('[input-companyEmail-clients]').type('test@gmail.com')
        cy.get('[input-companyPhone-clients]').type('6666-6666')
        cy.get('[btn-company-clients]').click()
        cy.wait(200)
        cy.get('tbody')
            .find('tr')
            .should('have.length', listingCount + 1)
    })
    it('Should delete the new register', () => {
        cy.contains('Test Company')
        cy.contains('test@gmail.com')
        cy.contains('6666-6666')
        cy.get('[delete-button="Test Company"]').click()
        cy.get('tbody')
            .find('tr')
            .then(listing => {
                listingCount = Cypress.$(listing).length
                expect(listing).to.have.length(listingCount)
            })
    })
})
