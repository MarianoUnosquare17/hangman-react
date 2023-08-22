import React, { useReducer, useEffect } from 'react';
import './App.css';

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
  selectedWordIndex: Math.floor(Math.random() * 11), 
  selectedInitialWord: '',
  displayedWord: '',
  guessedLetter: '',
  gameState: 'new',
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'RESET_GAME':
      const newRandomIndex = Math.floor(Math.random() * state.words.length);
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

function App() {
  
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    console.log("Selected Word:", state.selectedInitialWord);
  }, [state.selectedInitialWord]);

  useEffect(() => {
    console.log("Guessed Letter:", state.guessedLetter);
  }, [state.guessedLetter]);

  useEffect(() => {
    const newSelectedInitialWord = state.words[state.selectedWordIndex].toLowerCase();
    dispatch({ type: 'UPDATE_DISPLAYED_WORD', updatedDisplayedWord: '_ '.repeat(newSelectedInitialWord.length) });
    dispatch({ type: 'SET_SELECTED_INITIAL_WORD', selectedInitialWord: newSelectedInitialWord });
  }, [state.selectedWordIndex, state.words]);
//hice esto

function startNewGame() {
  dispatch({ type: 'RESET_GAME' });
  dispatch({ type: 'SET_SELECTED_INITIAL_WORD', selectedInitialWord: '' }); // Restablecer la palabra inicial seleccionada
}

//hice esto

  function submitGuess() {
    dispatch({ type: 'SUBMIT_GUESS', guessedLetter: state.guessedLetter });

    const newDisplayedWord = state.displayedWord.split(' ');
    const updatedDisplayedWord = state.selectedInitialWord
      .split('')
      .map((letter, index) =>
        letter === state.guessedLetter
          ? state.guessedLetter
          : newDisplayedWord[index]
      )
      .join(' ');

    dispatch({ type: 'UPDATE_DISPLAYED_WORD', updatedDisplayedWord });
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='text-5xl font-bold mb-10'>Hangman Game</div>
      <div className='flex flex-col md:flex-row w-full md:w-4/6 mx-auto justify-center items-center md:space-x-8'>
        <div className='flex-auto w-full md:w-2/5 md:order-1 md:mr-4 text-center md:text-left'>
          <div className='text-2xl font-bold mb-2 mt-5 md:mt-0'>
            Guesses left: {state.guess}
          </div>
          <div className='text-2xl font-bold mb-2 mt-5 md:mt-0'>
            Wrong Guesses:
          </div>
          <div className='text-1xl font-bold mb-2 mt-3 md:mt-0'>{/* aca van los wrong quesses */}</div>
          <div className='flex justify-center md:justify-start mt-5'>
            <button
              onClick={startNewGame}
              className='px-4 py-2 rounded-md font-bold text-sm bg-blue-500 text-white'
            >
              New Game
            </button>
          </div>
        </div>
        <div className='flex-auto w-full md:w-2/8 md:order-2 md:mt-7 mt-4 flex-col text-center md:text-left'>
          <div className='text-6xl'>{state.displayedWord}</div>

          <div className='text-3xl mt-4'>
            <input
              type='text'
              className='px-4 py-0 border mt-4 focus:outline-none text-sm rounded-md w-56 h-10'
              placeholder='Type your guess'
              value={state.guessedLetter}
              onChange={e =>
                dispatch({
                  type: 'SET_GUESSED_LETTER',
                  guessedLetter: e.target.value,
                })
              }
            />
            <button
              onClick={submitGuess}
              className='px-2 py-2 rounded-md font-bold text-sm bg-blue-500 text-white mt-4'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
