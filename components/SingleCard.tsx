import styles from "../styles/SingleCard.module.css";
const SingleCard = ({ card, onClick, flipped, disabled, speak }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(card);
      speak({ text: card.word });
    }
  };
  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped : ""}>
        <img src={card.src} className={styles.front} alt="card front" />
        <img
          src="/img/back.png"
          className={styles.back}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
