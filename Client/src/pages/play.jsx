import { useNavigate } from "react-router";
import axios from "../AXIOS/axiosinstance";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./play.css";
import GameContainer from "../components/GameContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz } from "../slice/quizSlice";

export default function PlayQuiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const { questions, loading, error } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <div className="container">
      <h1>Quizha Game Begin</h1>
      <GameContainer
        questions={questions}
        index={index}
        setIndex={setIndex}
        fetchQuiz={fetchQuiz}
      />
    </div>
  );
}
