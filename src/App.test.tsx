import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from "./App";

describe('<App />', () => {
    it('should render without crashing', () => {
        render(<App/>);
    })

    it('should show letter when a valid letter is submitted', async () => {
        // setup
        render(<App selectedWordIndex={1}/>);

        // act
        const input = screen.getByLabelText(/Letter/)
        await userEvent.type(input, 't');

        const button = screen.getByRole('button', {name: 'Submit'})
        await userEvent.click(button);

        // assert
        expect(screen.getByText('Guesses left: 4')).toBeDefined()
        expect(screen.getByText('t _ _ _ _ _ _ _ _ t')).toBeDefined()
    })

    // it('should ... when ...')
})

// describe('App', () => {
//     describe('when only one letter remains', () => {
//         describe('and the submitted letter is valid', () => {
//             it('should a success modal', () => {
//
//             })
//         })
//         describe('and the submitted letter is invalid', () => {
//
//         })
//     })
// })
