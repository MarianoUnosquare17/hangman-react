import React, { useState } from 'react'
import './App.css'

function App () {
  const [guess, setGuess] = useState<number>(5);
  const [words, setWords] = useState<string[]>([
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
  ]);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(
    Math.floor(Math.random() * words.length)
  );
  const selectedInitialWord: string = words[selectedWordIndex].toLowerCase();
  const [displayedWord, setDisplayedWord] = useState<string>(
    '_ '.repeat(selectedInitialWord.length)
  );
  const [guessedLetter, setGuessedLetter] = useState<string>('');
  const [gameState, setGameState] = useState<string>('new');

  function startNewGame() {
    const newRandomIndex: number = Math.floor(Math.random() * words.length);
    setSelectedWordIndex(newRandomIndex);
    const newSelectedInitialWord: string = words[newRandomIndex].toLowerCase();
    console.log("Selected Word:", newSelectedInitialWord); 
    setDisplayedWord('_ '.repeat(newSelectedInitialWord.length));
    setGuess(5);
    setGameState('new');
  }

  function submitGuess(e:any) {
    if (guessedLetter.length === 1) {
      const newDisplayedWord = displayedWord.split(' ');

      const updatedDisplayedWord = selectedInitialWord
        .split('')
        .map((letter, index) =>
          letter === guessedLetter
            ? guessedLetter
            : newDisplayedWord[index]
        )
        .join(' ');

      setDisplayedWord(updatedDisplayedWord);
    }

    setGuess(guess - 1);

    // Set wrong guesses
    if (guess === 1) {
      window.alert('Perdiste');
      startNewGame();
    }
  }



  

  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='text-5xl font-bold mb-10'>Hangman Game</div>
      <div className='flex flex-col md:flex-row w-full md:w-4/6 mx-auto justify-center items-center md:space-x-8'>
        <div className='flex-auto w-full md:w-2/5 md:order-1 md:mr-4 text-center md:text-left'>
          <div className='text-2xl font-bold mb-2 mt-5 md:mt-0'>
            Guesses left: {guess}
          </div>
          <div className='text-2xl font-bold mb-2 mt-5 md:mt-0'>
            Wrong Guesses:
          </div>
          <div className='text-1xl font-bold mb-2 mt-3 md:mt-0'>{}</div>
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
          <div className='text-6xl'>{displayedWord}</div>

          <div className='text-3xl mt-4'>
            <input
              type='text'
              className='px-4 py-0 border mt-4 focus:outline-none text-sm rounded-md w-56 h-10'
              placeholder='Type your guess'
              value={guessedLetter}
              onChange={e => setGuessedLetter(e.target.value)}
            />
            <button
              onClick={() => submitGuess(guessedLetter)}
              className='px-2 py-2 rounded-md font-bold text-sm bg-blue-500 text-white mt-4'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
