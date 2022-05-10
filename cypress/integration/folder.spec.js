describe('test folder functions', () => {
    it ('new folder', () => {
        // Login
        cy.visit('http://localhost:3000/login')
        cy.findByRole('button', {name: /sign in/i}).click()
        // Create new folder
        cy.findByRole('link', {name: /new folder/i}).click()
        cy.findByRole('textbox', {name: /folder name/i}).type('Test Folder Creation')
        cy.findByRole('textbox', {name: /description/i}).type('folder created for testing')
        cy.findByRole('textbox', {name: /desired completion date/i}).type('Janurary 1 2022')
        cy.findByRole('checkbox', {name: /expedite/i}).click()
        cy.findByRole('checkbox', {name: /confidential/i}).click()
        cy.findByRole('button', {name: /create folder/i}).click()
        // Return home and assert new folder was created
        cy.findByRole('link', {name: /home/i}).click()
        cy.findByText(/test folder creation/i).should('be.visible')
    })
})
