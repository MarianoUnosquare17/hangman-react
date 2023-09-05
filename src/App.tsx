import { useEffect } from 'react';
import './App.css';
import useGameReducer from './lib/useGameReducer.ts';
import { GameStatus } from './components/GameStatus.tsx';
import { HangmanGame } from './components/HangmanGame.tsx';

function App() {
  const [state, dispatch] = useGameReducer();

  // start a new game when the app loads
  useEffect(() => {
    dispatch({ type: 'RESET_GAME' });
  }, [dispatch]);

  // start a new game when the user clicks "New Game"
  function startNewGame() {
    dispatch({ type: 'RESET_GAME' });
  }

  function submitGuess() {
    dispatch({ type: 'SUBMIT_GUESS', guessedLetter: state.guessedLetter });

    const newDisplayedWord = state.displayedWord.split(' ');
    const updatedDisplayedWord = state.selectedInitialWord
      .split('')
      .map((letter, index) =>
        letter === state.guessedLetter
          ? state.guessedLetter
          : newDisplayedWord[index],
      )
      .join(' ');

    dispatch({ type: 'UPDATE_DISPLAYED_WORD', updatedDisplayedWord });
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-5xl font-bold mb-10">Hangman Game</div>
      <div className="flex flex-col md:flex-row w-full md:w-4/6 mx-auto justify-center items-center md:space-x-8">
        <div className="flex-auto w-full md:w-2/5 md:order-1 md:mr-4 text-center md:text-left">
          <GameStatus
            guessesLeft={state.guess}
            wrongGuesses={[]}
            onNewGame={startNewGame}
          />
        </div>
        <div className="flex-auto w-full md:w-2/8 md:order-2 md:mt-7 mt-4 flex-col text-center md:text-left">
          <HangmanGame
            displayedWord={state.displayedWord}
            guessedLetter={state.guessedLetter}
            setGuessedLetter={(guessedLetter) =>
              dispatch({
                type: 'SET_GUESSED_LETTER',
                guessedLetter,
              })
            }
            onSubmitGuess={submitGuess}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
