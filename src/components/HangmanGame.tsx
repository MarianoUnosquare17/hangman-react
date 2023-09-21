interface HangmanGameProps {
    displayedWord: string;
    guessedLetter: string;
    setGuessedLetter: (letter: string) => void;
    onSubmitGuess: () => void;
  }

  
  export function HangmanGame(props: HangmanGameProps) {
    const { displayedWord, guessedLetter, setGuessedLetter, onSubmitGuess} =
      props;
  
      const handleGuessSubmission = () => {
        
        if(/^[a-zA-Z]$/.test(guessedLetter)){
          onSubmitGuess();
          setGuessedLetter('');
        } else {
          setGuessedLetter('');
        }
      };

    return (
      <>
        <div className="text-6xl">{displayedWord}</div>
  
        <div className="text-3xl mt-4">
          <input
            type="text"
            className="px-4 py-0 border mt-4 focus:outline-none text-sm rounded-md w-56 h-10"
            placeholder="Type your guess"
            value={guessedLetter}
            onChange={(e) => setGuessedLetter(e.target.value)}
          />
          <button
            onClick={handleGuessSubmission}
            className="px-2 py-2 rounded-md font-bold text-sm bg-blue-500 text-white mt-4"
          >
            Submit
          </button>
        </div>
      </>
    );
  }