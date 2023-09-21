import { useEffect } from 'react';
import './App.css';
import useGameReducer from './lib/useGameReducer.ts';
import { GameStatus } from './components/GameStatus.tsx';
import { HangmanGame } from './components/HangmanGame.tsx';
import { WordProvider } from './lib/wordProvider.ts';

interface AppProps {
  wordProvider: WordProvider;
}

function App({ wordProvider }: AppProps) {
  const [state, dispatch] = useGameReducer(wordProvider);

  useEffect(() => {
    dispatch({ type: 'RESET_GAME' });
  }, [dispatch]);

  function startNewGame() {
    dispatch({ type: 'RESET_GAME' });
  }

  function submitGuess() {
    dispatch({ type: 'SUBMIT_GUESS', guessedLetter: state.guessedLetter });
    console.log('submit')
  }

  const { hasWon } = state;

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-5xl font-bold mb-10">Hangman Game</div>
      <div className="flex flex-col md:flex-row w-full md:w-4/6 mx-auto justify-center items-center md:space-x-8">
        <div className="flex-auto w-full md:w-2/5 md:order-1 md:mr-4 text-center md:text-left">
          <GameStatus
            guessesLeft={state.guess}
            wrongGuesses={[]}
            onNewGame={startNewGame}
            wrongGuess={state.wrongGuess}
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
      {hasWon && (
        <div className="text-3xl text-green-600 font-bold mt-4">
         You Won! Start a new Game
        </div>
      )}
    </div>
  );
}

export default App;