import React from "react";
import { render, unmountComponentAtNode } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../views/login";
import { act } from "react-test-renderer";

test ("logging in using credentials", () => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    render(
        <MemoryRouter initialEntries={['/dashboard']}>
            
        </MemoryRouter>,
        root
      );
    expect(document.getElementById('test')).toBeDefined;
})
