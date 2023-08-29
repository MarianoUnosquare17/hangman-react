import React, {useEffect} from 'react';
import './App.css';
import GameContents from "./components/GameContents.tsx";
import useGetGameReducer from "./lib/useGetGameReducer.ts";

interface AppProps {
    selectedWordIndex?: number
}

function App({selectedWordIndex}: AppProps) {
    const [state, dispatch] = useGetGameReducer();

    useEffect(() => {
        console.log("Selected Word:", state.selectedInitialWord);
    }, [state.selectedInitialWord]);

    useEffect(() => {
        console.log("Guessed Letter:", state.guessedLetter);
    }, [state.guessedLetter]);

    useEffect(() => {
        // const newSelectedInitialWord = state.words[state.selectedWordIndex].toLowerCase();
        // dispatch({ type: 'UPDATE_DISPLAYED_WORD', updatedDisplayedWord: '_ '.repeat(newSelectedInitialWord.length) });
        // dispatch({ type: 'SET_SELECTED_INITIAL_WORD', selectedInitialWord: newSelectedInitialWord });
        dispatch({type: 'RESET_GAME'});
    }, []);

//hice esto

    function startNewGame() {
        dispatch({type: 'RESET_GAME'});
        dispatch({type: 'SET_SELECTED_INITIAL_WORD', selectedInitialWord: ''}); // Restablecer la palabra inicial seleccionada
    }

//hice esto

    function submitGuess() {
        dispatch({type: 'SUBMIT_GUESS', guessedLetter: state.guessedLetter});

        const newDisplayedWord = state.displayedWord.split(' ');
        const updatedDisplayedWord = state.selectedInitialWord
            .split('')
            .map((letter, index) =>
                letter === state.guessedLetter
                    ? state.guessedLetter
                    : newDisplayedWord[index]
            )
            .join(' ');

        dispatch({type: 'UPDATE_DISPLAYED_WORD', updatedDisplayedWord});
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
                <GameContents displayedWord={state.displayedWord} guessedLetter={state.guessedLetter}
                              onLetterChange={e =>
                                  dispatch({
                                      type: 'SET_GUESSED_LETTER',
                                      guessedLetter: e.target.value,
                                  })
                              } onSubmit={submitGuess}/>

            </div>
        </div>
    );
}

export default App;
