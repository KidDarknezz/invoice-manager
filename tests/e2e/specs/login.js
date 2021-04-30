import authUser from '../fixtures/auth-user.json'

describe('manage user Login', () => {
    before(() => {
        cy.logout()
    })
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })
    it('Should lo in with email and password and then log out', () => {
        const {email, password} = authUser
        cy.get('[input-email-login]').type(email)
        cy.get('[input-password-login]').type(password)
        cy.get('[btn-login-login]').click()
        cy.get('[btn-logout-home]')
            .should('contain', 'Salir')
            .click()
        cy.logout()
    })
    it('Should log in with a correct email and wrong password and then log out', () => {
        const {email, password} = authUser
        cy.get('[input-email-login]').type(email)
        cy.get('[input-password-login]').type(password + 'test')
        cy.get('[btn-login-login]').click()
        cy.on('window:alert', str => {
            expect(str).to.equal(`The password is invalid or the user does not have a password.`)
        })
    })
    it('Should log in with a wrong email and wrong password and then log out', () => {
        const {email, password} = authUser
        cy.get('[input-email-login]').type(email + 'test')
        cy.get('[input-password-login]').type(password + 'test')
        cy.get('[btn-login-login]').click()
        cy.on('window:alert', str => {
            expect(str).to.equal(
                `There is no user record corresponding to this identifier. The user may have been deleted.`
            )
        })
    })
    it('Should log in with a rm-service email and password and then see their logo and log out', () => {
        cy.get('[input-email-login]').type('rpinto@rm-servicios.com')
        cy.get('[input-password-login]').type('BlueBalloon123!')
        cy.get('[btn-login-login]').click()
        cy.wait(1500)
        // cy.get('[data-cy=Rm Services]')
        // cy.get('div[class="q-img"]')

        // cy.on('window:alert', str => {
        //     expect(str).to.equal(
        //         `There is no user record corresponding to this identifier. The user may have been deleted.`
        //     )
        // })
    })
})
