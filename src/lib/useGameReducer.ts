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
  gameState: string;
}

export type Action =
  | { type: 'RESET_GAME' }
  | { type: 'SUBMIT_GUESS'; guessedLetter: string }
  | { type: 'UPDATE_DISPLAYED_WORD'; updatedDisplayedWord: string }
  | { type: 'SET_GUESSED_LETTER'; guessedLetter: string }
  | { type: 'SET_SELECTED_INITIAL_WORD'; selectedInitialWord: string }; // Agrega esta línea

const initialState: GameState = {
  guess: 5,
  selectedInitialWord: '',
  displayedWord: '',
  guessedLetter: '',
  gameState: 'new',
};

function getGameReducer(wordProvider: WordProvider) {
  return function gameReducer(state: GameState, action: Action): GameState {
    switch (action.type) {
      case 'RESET_GAME': {
        const newSelectedWord = wordProvider();

        return {
          ...state,
          guess: 5,
          selectedInitialWord: newSelectedWord,
          displayedWord: '_ '.repeat(newSelectedWord.length),
          guessedLetter: '',
          gameState: 'new',
        };
      }

      case 'SUBMIT_GUESS': {
        const newDisplayedWord = state.displayedWord.split(' ');
        const updatedDisplayedWord = state.selectedInitialWord
          .split('')
          .map((letter, index) =>
            letter === action.guessedLetter
              ? action.guessedLetter
              : newDisplayedWord[index],
          )
          .join(' ');
        return {
          ...state,
          displayedWord: updatedDisplayedWord,
          guessedLetter: action.guessedLetter,
          guess: state.guess - 1,
          gameState: state.guess === 1 ? 'lost' : state.gameState,
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
