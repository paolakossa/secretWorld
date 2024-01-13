import './App.css'
import StartScreen from './components/StartScreen'
import { useCallback, useEffect, useState } from 'react'
import { wordList } from './data/word'
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages:{ id: number; name: string }[] = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState<string[]>([])

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wrongLetters, setWrongLetters] = useState<string[]>([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory = useCallback(() => {
    // Obtenha as categorias como um array
    const categories = Object.keys(words) as Array<keyof typeof words>;
  
    // Escolha uma categoria aleatória
    const category = categories[Math.floor(Math.random() * categories.length)];
  
    // Escolha uma palavra aleatória dentro da categoria escolhida
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return{word, category}
  },[words]);

//starts the secret word game
 const startGame = useCallback(():void => {
  //clear all letters
  clearLetterStages()
  //pick word e pick category
  const {word, category} =  pickedWordAndCategory()

  //create an array of letters
  let wordLetters = word.split('')
  
  wordLetters = wordLetters.map((l) => l.toLowerCase())
  
  // fill states

  setPickedWord(word)
  setPickedCategory(category)
  setLetters(wordLetters)
  
  setGameStage(stages[1].name)

 },[pickedWordAndCategory])

//process the letter input

  const verifyLetter = (letter:string):void => {
    const normalizeLetter = letter.toLowerCase()

    //check if letter has already been utilezed
    if(guessedLetters.includes(normalizeLetter) || 
      wrongLetters.includes(normalizeLetter)
    ) {
      return
    }

    //push guessed letter or remove a guess
    if(letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStages = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }
//check if guesses ended
useEffect(() => {
  if(guesses <= 0) {
    //reset all states
    clearLetterStages()
    setGameStage(stages[2].name)
  }
}, [guesses])

//check win condition
useEffect(() => {
  const uniqueLetters = [...new Set(letters)]

  //win condition
  if(guessedLetters.length === uniqueLetters.length) {
    //add score
    setScore((actualScore) => actualScore += 100)
    
    //restart game with new word
    startGame()

  }

},[guessedLetters, letters, startGame])

// restarts the game

const retry = ():void => {
  setScore(0)
  setGuesses(guessesQty)
  setGameStage(stages[0].name)
}
  
  return (
    <>
    <div className='App'>
     {gameStage === 'start' && <StartScreen startGame={startGame}/>}
     {gameStage === 'game' && (
     <Game verifyLetter={verifyLetter} 
     pickedWord={pickedWord} 
     pickedCategory={pickedCategory} 
     letters={letters}
     guessedLetters={guessedLetters}
     wrongLetters={wrongLetters}
     guesses={guesses}
     score={score}/>
     )}
     {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
    </>
  )
}

export default App
