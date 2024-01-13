import styles from './GameOver.module.css'

interface GameOverProps {
    retry: (event: React.MouseEvent<HTMLButtonElement>) => void;
    score:number
  }
  
  const GameOver: React.FC<GameOverProps> = ({ retry, score }) =>  {
  return (
    <div>
        <h1>Fim de Jogo!</h1>
        <h2 >A sua pontuação foi: <span className={styles.ponto}>{score}</span></h2>
        <button onClick={retry}>Reiniciar jogo</button>
    </div>
  )
}

export default GameOver