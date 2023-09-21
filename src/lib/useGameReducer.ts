import { useReducer } from 'react';
import { WordProvider } from './wordProvider.ts';

export default function useGameReducer(wordProvider: WordProvider) {
    return useReducer(getGameReducer(wordProvider), initialState);
}

export interface GameState {
    guess: number;
    selectedInitialWord: string;
    displayedWord: string;
    guessedLetter: string;
    hasWon: boolean;
    wrongGuess: string[]
}

export type Action =
    | { type: 'RESET_GAME' }
    | { type: 'SUBMIT_GUESS'; guessedLetter: string }
    | { type: 'UPDATE_DISPLAYED_WORD'; updatedDisplayedWord: string }
    | { type: 'SET_GUESSED_LETTER'; guessedLetter: string }
    | { type: 'SET_SELECTED_INITIAL_WORD'; selectedInitialWord: string };

const initialState: GameState = {
    guess: 5,
    selectedInitialWord: '',
    displayedWord: '',
    guessedLetter: '',
    hasWon: false,
    wrongGuess:[]
};

function getGameReducer(wordProvider: WordProvider) {
    return function gameReducer(state: GameState, action: Action): GameState {
        switch (action.type) {
            case 'RESET_GAME': {
                const newSelectedWord = wordProvider();

                return {
                    ...initialState,
                    selectedInitialWord: newSelectedWord,
                    displayedWord: '_ '.repeat(newSelectedWord.length),
                };
            }

            case 'SUBMIT_GUESS': {
                const newSelectedWord = wordProvider();
                const newDisplayedWord = state.displayedWord.split(' ');
                // Actualizar displayedWord
                const updatedDisplayedWord = state.selectedInitialWord
                  .split('')
                  .map((letter, index) =>
                    letter === action.guessedLetter
                      ? action.guessedLetter
                      : newDisplayedWord[index]
                  )
                  .join(' ');
              
                // Quitar espacios de la palabra
                const word = updatedDisplayedWord.split(/\s+/).join('');
                let newGuess = state.guess;
                let newWrongGuesses = [...state.wrongGuess]; 
              
                if (word === state.selectedInitialWord) {
                  return {
                    ...state,
                    displayedWord: updatedDisplayedWord,
                    guessedLetter: action.guessedLetter,
                    guess: newGuess,
                    hasWon: true,
                  };
                }
              
                if (state.selectedInitialWord.indexOf(action.guessedLetter) === -1) {
                  newGuess--;
              
                  if (!newWrongGuesses.includes(action.guessedLetter)) {
                    newWrongGuesses.push(action.guessedLetter);
                    console.log('Wrong Guesses:', newWrongGuesses);
                  }
              

                  if (newGuess === 0) {
                    return {
                      ...initialState,
                      selectedInitialWord: newSelectedWord,
                      displayedWord: '_ '.repeat(newSelectedWord.length),
                    };
                  }
                }
              
                return {
                  ...state,
                  displayedWord: updatedDisplayedWord,
                  guessedLetter: action.guessedLetter,
                  guess: newGuess,
                  hasWon: false,
                  wrongGuess: newWrongGuesses, 
                };
              }


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
    };
}