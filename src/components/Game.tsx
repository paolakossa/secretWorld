import styles from './Game.module.css'
import { useState, useRef } from 'react';

interface GameProps {
    verifyLetter: (letter: string) => void;
    pickedWord: string,
    pickedCategory: string,
    letters: string[],
    guessedLetters: string[],
    wrongLetters: string[],
    guesses: number,
    score: number

  }
  
  const Game: React.FC<GameProps> = 
    ({ verifyLetter, 
        pickedWord, 
        pickedCategory, 
        letters, 
        guessedLetters, 
        wrongLetters,
        guesses,
        score
    }) =>  {
        const [letter, setLetter] = useState('')
        const letterInputRef = useRef<HTMLInputElement>(null)

        const handleSubmit = (e:any) => {
            e.preventDefault()

            verifyLetter(letter)

            setLetter('')

            if (letterInputRef.current) {
                letterInputRef.current.focus();
              }
        }
    return (
        <div className={styles.game}>
            <p className={styles.points}>
                <span>Pontuação: {score}</span>
            </p>
            <h1>Advinha a palavra:</h1>
            <h3 className={styles.tip}>
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativa(s).</p>
            <div className={styles.wordContainer}>
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className={styles.letter}>{letter}</span>
                    ) : (
                        <span key={i} className={styles.blankSquare}></span>
                    )
                ))}
            </div>
            <div className={styles.letterContainer}>
                <p>Tente advinhar a letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name='letter' 
                    maxLength={1} 
                    required 
                    onChange={(e) => setLetter(e.target.value)}
                    value={letter}
                    ref={letterInputRef}/>
                    <button>Jogar!</button>
                </form>
            </div>
            <div className={styles.wrongLettersContainer}>
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter},</span>
                ))}
            </div>
        </div>
        
    )
}

export default Game