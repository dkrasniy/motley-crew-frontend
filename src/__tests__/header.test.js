import {render, screen} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {MemoryRouter, Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import Header from "../components/Header"

test ('rendering header', async () => {
  render (<Header/>, {wrapper: MemoryRouter})

  expect(screen.getByText(/Home/i)).toBeInTheDocument()
})