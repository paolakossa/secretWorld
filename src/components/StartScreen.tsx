import styles from './StartScreen.module.css'

interface StartScreenProps {
  startGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ startGame }) => {
  return (
    <div className={styles.start}>
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen