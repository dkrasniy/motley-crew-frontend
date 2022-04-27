import {render, screen} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {MemoryRouter, Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import {App} from '../App'

test ("login screen renders", () => {
    const history = createMemoryHistory()
    render(
        <Router history={history}>
            <App/>
        </Router>
    )
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
})