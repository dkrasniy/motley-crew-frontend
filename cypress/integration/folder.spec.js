describe('test folder functions', () => {
    it ('new folder', () => {
        // Login
        cy.visit('https://motleycrewdev.com/login')
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

    it ('edit folder', () => {
        //Login
        cy.visit('https://motleycrewdev.com/login')
        cy.findByRole('button', {name: /sign in/i}).click()
        // Edit folder
        cy.findByText(/test folder creation/i).click()
        cy.findByRole('button', {  name: /edit folder/i}).click()
        cy.findByRole('textbox', {  name: /folder name/i}).clear()
        cy.findByRole('textbox', {  name: /folder name/i}).type('Test Folder Edit')
        cy.findByRole('button', {  name: /save changes/i}).click()
        // Assert edit to folder
        cy.findByText(/test folder edit/i).should('be.visible')
    })

    it ('delete folder', () => {
        // Login
        cy.visit('https://motleycrewdev.com/login')
        cy.findByRole('button', {name: /sign in/i}).click()
        // Remove test folder creation
        cy.findByText(/test folder creation/i).click()
        cy.findByRole('button', {name: /more/i}).click()
        cy.findByRole('button', {name: /delete/i}).click()
        // Assert that folder was deleted
        cy.findByText(/test folder edit/i).should('not.exist')
    })
})
