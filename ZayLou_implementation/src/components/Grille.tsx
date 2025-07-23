import Case from './Case'

export function Grille() {
  const lignes = 10;
  const colonnes = 30;
  const totalCases = lignes * colonnes;

  return (
    <div
      className="grille"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${colonnes}, 1fr)`,
        width: '100vw',
        aspectRatio: `${colonnes} / ${lignes}`,
        border: '2px solid black',
      }}
    >
      {Array.from({ length: totalCases }, (_, i) => (
        <Case key={i} />
      ))}
    </div>
  )
}

export default Grille
