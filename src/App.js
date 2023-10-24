import "./styles.css";
import holeImg from "./assets/hole.png";
import moleImg from "./assets/mole.png";
import { useEffect, useState } from "react";

export default function App() {
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [score, setScore] = useState(0);

  const setMoleVisibility = (idx, isVisible) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[idx] = isVisible;
      return newMoles;
    });
  };

  const wackMole = (idx) => {
    if (!moles[idx]) return;
    hideMole(idx);
    setScore(score + 1);
  };

  // when this component mounds, you want it to initialize and set an interval
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisibility(randomIndex, true);
      setTimeout(() => {
        setMoleVisibility(randomIndex, false);
      }, 850);
    }, 1000);

    // clean up interval
    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  return (
    <>
      <h1>Score: {score}</h1>
      <div className="grid">
        {moles.map((isMole, idx) => (
          <img
            key={idx}
            src={isMole ? moleImg : holeImg}
            onClick={() => wackMole(idx)}
          />
        ))}
      </div>
    </>
  );
}
