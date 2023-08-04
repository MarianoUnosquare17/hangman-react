import React from 'react';
import './App.css';

function App() {
  return (
    <div className='flex flex-col items-center mt-10'>
      <div className="text-5xl font-bold mb-10">Hangman Game</div>
      <div className='flex flex-col md:flex-row w-full md:w-4/6 mx-auto justify-center items-center md:space-x-8'> 
        <div className='flex-auto w-full md:w-1/3 md:order-1 md:mr-4 text-center md:text-left'> 
          <div className='text-2xl font-bold mb-2 mt-5 md:mt-0'> 
            Guesses left: 0
          </div>
          <div className='text-2xl font-bold mb-2 mt-5 md:mt-0'> 
            Wrong Guesses: 
          </div>
          <div className='text-1xl font-bold mb-2 mt-3 md:mt-0'> 
            A S D F G H J K L Z X
          </div>
          <div className='flex justify-center md:justify-start mt-5'>
            <button
              onClick={() => {}}
              className="px-4 py-2 rounded-md font-bold text-sm bg-blue-500 text-white" 
            >
              New Game
            </button>
          </div>
        </div>
        <div className='flex-auto w-full md:w-1/2 md:order-2 md:mt-7 mt-4 flex-col text-center md:text-left'> 
          <div className='text-6xl'>
            _ _ _ _ a _ _
          </div>
          <div className='text-3xl mt-4'> 
            <input
              type="text"
              className="px-4 py-1 border mt-4 focus:outline-none text-sm rounded-md w-56 h-10"
              placeholder="Type your guess"
            />
            <button
              onClick={() => {}}
              className="px-4 py-2 rounded-md font-bold text-sm bg-blue-500 text-white mt-4" 
            >
              Sub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
