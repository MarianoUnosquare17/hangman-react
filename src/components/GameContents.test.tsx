import {render} from "@testing-library/react";
import React from "react";
import GameContents from "./GameContents.tsx";

describe('<GameContents />', () => {
    it('test', () => {
        const onLetterChangeMock = jest.fn();

        // render(<GameContents
        //     displayedWord={}
        //     guessedLetter={}
        //     onLetterChange={onLetterChangeMock}
        //     onSubmit={}
        // );

        fireEvent.input('a')

        expect(onLetterChangeMock).toHaveBeenCalled();
    });
})
