import React, { ChangeEvent, useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import SingleCard from "../components/SingleCard";
import styles from "../styles/Home.module.css";
import { imgs, imgs2 } from "../utils";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [imgSet, setImgSet] = useState([...imgs]);
  const [cardSet, setCardSet] = useState("");
  const { speak } = useSpeechSynthesis();

  const shuffleCards = () => {
    const shuffledCards = [...imgSet, ...imgSet]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleNewGame = () => {
    setImgSet([...imgs]);
    shuffleCards();
    setCardSet("set1");
  };

  const handleChoice = (card: object) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const handleChange = (e: ChangeEvent<{ value: string | unknown }>) => {
    shuffleCards();

    if (e.target.value === "set1") {
      setImgSet([...imgs]);
      setCardSet("set1");
    } else if (e.target.value === "set2") {
      setImgSet([...imgs2]);
      setCardSet("set2");
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (choiceOne.src === card.src) {
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

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, [imgSet]);

  return (
    <div className={styles.container}>
      <h1>Fruit Card Game</h1>
      <button onClick={handleNewGame}>New Game</button>
      <select onChange={handleChange} value={cardSet}>
        <option value="set1">1 Set</option>
        <option value="set2">2 Set</option>
      </select>
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
      <div>Turns: {turns}</div>
    </div>
  );
}
