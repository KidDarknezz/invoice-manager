import authUser from '../fixtures/auth-user.json'

describe('manage user Login', () => {
    it('Should log in with email and password and then log out', () => {
        const {email, password} = authUser
        cy.visit('localhost:8080')
        cy.get('[input-email-login]').type(email)
        cy.get('[input-password-login]').type(password)
        cy.get('[btn-login-login]').click()
        cy.get('[btn-logout-home]')
            .should('contain', 'Logout')
            .click()
    })
    it('Should log in with a correct email and wrong password and then log out', () => {
        const {email, password} = authUser
        cy.visit('localhost:8080')
        cy.get('[input-email-login]').type(email)
        cy.get('[input-password-login]').type(password + 'test')
        cy.get('[btn-login-login]').click()
        cy.on('window:alert', str => {
            expect(str).to.equal(`The password is invalid or the user does not have a password.`)
        })
    })
    it('Should log in with a wrong email and wrong password and then log out', () => {
        const {email, password} = authUser
        cy.visit('localhost:8080')
        cy.get('[input-email-login]').type(email + 'test')
        cy.get('[input-password-login]').type(password + 'test')
        cy.get('[btn-login-login]').click()
        cy.on('window:alert', str => {
            expect(str).to.equal(
                `There is no user record corresponding to this identifier. The user may have been deleted.`
            )
        })
    })
})
