import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../AXIOS/axiosinstance";
import GameApi from "../components/APIGameContainer";

export default function QuizAPI() {
  const navigate = useNavigate();
  const [quizzesAPI, setQuizzesAPI] = useState([]);

  async function fetchAPI() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/quiz/api`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        setQuizzesAPI(data.data);
      } else {
        throw new Error("Data soal tidak ditemukan!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Terjadi kesalahan saat mengambil soal!",
      });
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="container">
      {quizzesAPI.length > 0 ? (
        <GameApi quizAPI={quizzesAPI} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "50px" }}>Memuat soal...</p>
      )}
    </div>
  );
}
