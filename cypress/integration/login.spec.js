describe('tests related to authetication/login', () => {
    it ('user can login', () => {
        // navigate to site and login
        cy.visit('https://motleycrewdev.com/login')
        // cy.findByRole('textbox', {name: /Email address/i}).clear()
        // cy.findByRole('textbox', {name: /Email address/i}).type('ecovertmc')
        // cy.findByLabelText(/password/i).clear()
        // cy.findByLabelText(/password/i).type('s4!apgjuadg5')
        cy.findByRole('button', {name: /sign in/i}).click()
        // assert that the user has logged in by checking that the home navbar is viewable
        cy.findByRole('link', {name: /home/i}).should('be.visible')
    })

    it ('user can logout', () => {
        // navigate to site and login
        cy.visit('https://motleycrewdev.com/login')
        cy.findByRole('button', {name: /sign in/i}).click()
        // click on user profile and logout
        cy.findByRole('button', {  name: /🤦 ecovertmc ethancovert@csus\.edu/i}).click()
        cy.findByRole('menuitem', {  name: /log out/i}).click()
        // assert that the user has logged out by checking if the login screen is viewable
        cy.findByRole('heading', {  name: /welcome/i}).should('be.visible')
    })

})
