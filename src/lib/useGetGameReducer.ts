import {useReducer} from "react";

export default function useGetGameReducer() {
    const [state, dispatch] = useReducer(getGameReduer(selectedWordIndex), initialState);

}

type Action =
    | { type: 'RESET_GAME' }
    | { type: 'SUBMIT_GUESS'; guessedLetter: string }
    | { type: 'UPDATE_DISPLAYED_WORD'; updatedDisplayedWord: string }
    | { type: 'SET_GUESSED_LETTER'; guessedLetter: string }
    | { type: 'SET_SELECTED_INITIAL_WORD'; selectedInitialWord: string }; // Agrega esta línea

interface GameState {
    guess: number;
    words: string[];
    selectedWordIndex: number;
    selectedInitialWord: string;
    displayedWord: string;
    guessedLetter: string;
    gameState: string;
}

const initialState: GameState = {
    guess: 5,
    words: [
        'React',
        'Typescript',
        'Web',
        'Javascript',
        'Vue',
        'Unosquare',
        'Array',
        'String',
        'Java',
        'Localhost',
        'Developer',
    ],
    selectedWordIndex: -1,
    selectedInitialWord: '',
    displayedWord: '',
    guessedLetter: '',
    gameState: 'new',
};

function getGameReduer(wordIndex?: number) {
    return function gameReducer(state: GameState, action: Action): GameState {
        switch (action.type) {
            case 'RESET_GAME':
                let newRandomIndex: number;

                if (wordIndex !== undefined) {
                    newRandomIndex = wordIndex;
                } else {
                    newRandomIndex = Math.floor(Math.random() * state.words.length);
                }

                const newSelectedInitialWord = state.words[newRandomIndex].toLowerCase();
                return {
                    ...state,
                    guess: 5,
                    selectedWordIndex: newRandomIndex,
                    selectedInitialWord: newSelectedInitialWord,
                    displayedWord: '_ '.repeat(newSelectedInitialWord.length),
                    guessedLetter: '',
                    gameState: 'new',
                };

            case 'SUBMIT_GUESS':
                const newDisplayedWord = state.displayedWord.split(' ');
                const updatedDisplayedWord = state.selectedInitialWord
                    .split('')
                    .map((letter, index) =>
                        letter === action.guessedLetter
                            ? action.guessedLetter
                            : newDisplayedWord[index]
                    )
                    .join(' ');
                return {
                    ...state,
                    displayedWord: updatedDisplayedWord,
                    guessedLetter: action.guessedLetter,
                    guess: state.guess - 1,
                    gameState: state.guess === 1 ? 'lost' : state.gameState,
                };

            case 'UPDATE_DISPLAYED_WORD':
                return {
                    ...state,
                    displayedWord: action.updatedDisplayedWord,
                };

            case 'SET_GUESSED_LETTER':
                return {
                    ...state,
                    guessedLetter: action.guessedLetter,
                };

            case 'SET_SELECTED_INITIAL_WORD':
                return {
                    ...state,
                    selectedInitialWord: action.selectedInitialWord,
                };

            default:
                return state;
        }
    }

}
