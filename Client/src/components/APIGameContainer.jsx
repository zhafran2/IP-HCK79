import { useState } from "react";
import { useNavigate } from "react-router";

export default function GameApi({ quizAPI }) {
const navigate =useNavigate()
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Pastikan ada data soal
  if (!quizAPI || quizAPI.length === 0) return <p>Soal tidak tersedia.</p>;

  const currentQuestion = quizAPI[index];

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;

    setUserAnswer(optionIndex);
    setIsAnswered(true);

    if (optionIndex === currentQuestion.ans) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    if (index < quizAPI.length - 1) {
      setIndex(index + 1);
      setUserAnswer(null);
      setIsAnswered(false);
    } else {
      alert(`Game Over! Skor akhir: ${score}/${quizAPI.length}`);
      navigate('/')
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.question}>{currentQuestion.question}</h2>

      <div style={styles.optionsContainer}>
        {[
          currentQuestion.option1,
          currentQuestion.option2,
          currentQuestion.option3,
          currentQuestion.option4,
        ].map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx + 1)}
            style={{
              ...styles.optionButton,
              backgroundColor:
                userAnswer === idx + 1
                  ? userAnswer === currentQuestion.ans
                    ? "green"
                    : "red"
                  : "#007bff",
            }}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>

      <p style={styles.info}>
        Soal {index + 1} dari {quizAPI.length}
      </p>

      <p style={styles.score}>Skor: {score}</p>

      <button
        onClick={nextQuestion}
        style={styles.nextButton}
        disabled={!isAnswered}
        className="btn"
      >
        Next ➡️
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  question: { fontSize: "20px", marginBottom: "20px" },
  optionsContainer: { display: "flex", flexDirection: "column", gap: "10px" },
  optionButton: {
    padding: "10px",
    fontSize: "16px",
    width: "250px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    color: "white",
  },
  info: { marginTop: "15px" },
  score: { fontWeight: "bold", fontSize: "18px" },
  nextButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "green-900",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};
