import {render, screen} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {MemoryRouter, Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import {App} from '../App'
import PublicRoute from '../components/PublicRoute'

test ("login screen renders", async () => {
    render(<PublicRoute/>, {wrapper: MemoryRouter})

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
})

