import React, { ChangeEvent, useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { photos_1, photos_2 } from "../utils";
import SingleCard from "../components/SingleCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [images, setImages] = useState([...photos_1]);
  const [cardsetNum, setCardsetNum] = useState("");
  const { speak } = useSpeechSynthesis();

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setCards(shuffledCards);
  };

  const handleNewGame = () => {
    setImages([...photos_1]);
    shuffleCards();
    setCardsetNum("set1");
  };

  const handleChoice = (card: object) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const handleChange = (e: ChangeEvent<{ value: string | unknown }>) => {
    shuffleCards();

    if (e.target.value === "set1") {
      setImages([...photos_1]);
      setCardsetNum("set1");
    } else if (e.target.value === "set2") {
      setImages([...photos_2]);
      setCardsetNum("set2");
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.word === choiceTwo.word) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (choiceOne.word === card.word) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, [images]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fruit Card Game 🍊</h1>

      {/* New game button */}
      <button className={styles.newGame_btn} onClick={handleNewGame}>
        New Game
      </button>

      {/* select for game set */}
      <div className={styles.gameSet_container}>
        <select
          className={styles.gameSet_select}
          onChange={handleChange}
          value={cardsetNum}
        >
          <option value="set1">Game Set 1</option>
          <option value="set2">Game Set 2</option>
        </select>
        {/* pointer */}
        <div className={styles.pointer}>
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {/* cards display */}
      <div className={styles.cards}>
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            onClick={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            speak={speak}
          />
        ))}
      </div>
      <div className={styles.turns}>Turns: {turns}</div>
    </div>
  );
}
