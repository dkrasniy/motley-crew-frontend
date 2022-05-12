describe('login', () => {
    it ('user can login', () => {
        cy.visit('https://motleycrewdev.com/login')
        // cy.findByRole('textbox', {name: /Email address/i}).clear()
        // cy.findByRole('textbox', {name: /Email address/i}).type('ecovertmc')
        // cy.findByLabelText(/password/i).clear()
        // cy.findByLabelText(/password/i).type('s4!apgjuadg5')
        cy.findByRole('button', {name: /sign in/i}).click()
        cy.findByRole('link', {name: /home/i}).should('be.visible')
    })
})
