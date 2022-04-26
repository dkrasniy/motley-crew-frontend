import React from "react";
import { render, unmountComponentAtNode } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../views/login";
import { act } from "react-test-renderer";
import App from '../App'

test ("logging in using credentials", () => {

    const root = document.createElement('div')
    document.body.appendChild(root)
    
    render(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>,
        root
      );

      act(() => {
        const emailInput = document.getElementById("email")
        emailInput.value = "ecovertmc"
        const passInput = document.getElementById("password")
        passInput.value = "ecovertmc"
        const signIn = document.querySelectorAll('input[type=submit]')
        signIn.dispatchEvent(new MouseEvent("click"))
      })

    expect(document.querySelectorAll('header')).toBeDefined;

})
