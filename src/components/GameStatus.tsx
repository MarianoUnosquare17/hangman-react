interface GameStatusProps {
    guessesLeft: number;
    wrongGuesses: string[];
    onNewGame: () => void;
    wrongGuess: string[]
  }
  
  export function GameStatus(props: GameStatusProps) {
    const { guessesLeft, wrongGuesses, onNewGame, wrongGuess } = props;
  
    return (
      <>
        <div className="text-2xl font-bold mb-2 mt-5 md:mt-0">
          Guesses left: {guessesLeft}
        </div>
        <div className="text-2xl font-bold mb-2 mt-5 md:mt-0">
          Wrong Guesses: {wrongGuesses.join(", ")}
        </div>
        <div className="text-1xl font-bold mb-2 mt-3 md:mt-0 flex space-x-2">
          {wrongGuess.map(letter => {
            return(
              <div className="text-lg text-red-500 rounded px-2 py-1">{letter}</div>
            )
          })}
        </div>
        <div className="flex justify-center md:justify-start mt-5">
          <button
            onClick={onNewGame}
            className="px-4 py-2 rounded-md font-bold text-sm bg-blue-500 text-white"
          >
            New Game
          </button>
        </div>
      </>
    );
  }