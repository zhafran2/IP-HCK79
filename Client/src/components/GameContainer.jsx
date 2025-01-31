import React, { useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
import Swal from "sweetalert2";
import "./GameContainer.css";

export default function GameContainer({ questions, index, setIndex }) {
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0); // State untuk menyimpan jumlah benar
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  if (!questions.length) {
    return <h1 style={{ textAlign: "center" }}>No quiz available</h1>;
  }

  const handleOptionClick = (selectedAnswer) => {
    if (isAnswered) return; // Mencegah pemilihan berulang kali

    setUserAnswer(selectedAnswer);
    setIsAnswered(true);

    const isCorrect = selectedAnswer === questions[index].ans;
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1); // Tambah skor jika jawaban benar
    }

    Swal.fire({
      icon: isCorrect ? "success" : "error",
      title: isCorrect ? "Correct!" : "Wrong!",
      text: isCorrect
        ? "Great job! That's the correct answer."
        : `Oops! The correct answer was ${questions[index][`option${questions[index].ans}`]}.`,
    });
  };

  const handleNext = () => {
    if (!isAnswered) {
      Swal.fire({
        icon: "warning",
        title: "No Answer Selected",
        text: "Please select an answer before proceeding.",
      });
      return;
    }

    setIsAnswered(false); // Reset state untuk pertanyaan berikutnya

    if (index < questions.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setUserAnswer(null);
    } else {
      // Jika kuis selesai, tampilkan skor dan navigasikan ke "/"
      Swal.fire({
        icon: "success",
        title: "Quiz Completed!",
        text: `You got ${score} out of ${questions.length} correct!`,
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Arahkan pengguna ke halaman beranda
      });
    }
  };

  return (
    <div className="quiz-container">
      <h2>
        Question {index + 1} of {questions.length}
      </h2>
      <p>{questions[index].question}</p>
      <div className="options-container">
        {Array.from({ length: 4 }).map((_, i) => {
          const optionKey = `option${i + 1}`;
          const isCorrect = i + 1 === questions[index].ans;
          const optionClass = isAnswered
            ? userAnswer === i + 1
              ? isCorrect
                ? "correct"
                : "incorrect"
              : isCorrect
              ? "correct"
              : ""
            : "";

          return (
            <div
              key={i}
              className={`option ${optionClass}`}
              onClick={() => handleOptionClick(i + 1)}
            >
              {questions[index][optionKey]}
            </div>
          );
        })}
      </div>
      <button className="next-button" onClick={handleNext}>
        {index < questions.length - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
}
