import React, { useState, useRef } from 'react'
import './App.css'

function App () {
  const [guess, setGuess] = useState<number>(5)
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
    'Developer'
  ])
  const randomIndex: number = Math.floor(Math.random() * words.length)
  const selectedInitialWord: string = words[randomIndex]
  const [displayedWord, setDisplayedWord] = useState(
    '_ '.repeat(selectedInitialWord.length)
  )
  const [guessedWord, setGuessedWord] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null);

  function startNewGame () {
    const newRandomIndex: number = Math.floor(Math.random() * words.length)
    const newSecretWord: string = words[newRandomIndex]
    //Set guesses left a 10
    setDisplayedWord('_ '.repeat(newSecretWord.length))
    console.log(newSecretWord)
  }

  function submitGuess (e: any) {
    setGuess(guess - 1)
    console.log(guessedWord)
    //Poner condicion para cuando se llegue a  0
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
              value={guessedWord}
              onChange={e => setGuessedWord(e.target.value)}
              ref={inputRef} 
            />
            <button
              onClick={() => submitGuess(guessedWord)}
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
