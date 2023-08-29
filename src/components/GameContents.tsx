import React, {ChangeEvent} from "react";

interface GameContentsProps {
    displayedWord: string
    guessedLetter: string
    onLetterChange: (e: ChangeEvent<HTMLInputElement>) => {}
    onSubmit: () => {}
}

export default function GameContents({displayedWord, guessedLetter, onLetterChange, onSubmit}: GameContentsProps) {
    return (
        <div className='flex-auto w-full md:w-2/8 md:order-2 md:mt-7 mt-4 flex-col text-center md:text-left'>
            <div className='text-6xl'>{displayedWord}</div>

            <div className='text-3xl mt-4'>
                <label>
                    Letter:
                    <input
                        type='text'
                        className='px-4 py-0 border mt-4 focus:outline-none text-sm rounded-md w-56 h-10'
                        placeholder='Type your guess'
                        value={guessedLetter}
                        onChange={onLetterChange}
                    />
                </label>
                <button
                    onClick={onSubmit}
                    className='px-2 py-2 rounded-md font-bold text-sm bg-blue-500 text-white mt-4'
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
