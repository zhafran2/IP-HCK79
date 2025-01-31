import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../AXIOS/axiosinstance";
import Swal from "sweetalert2";
export default function AddQuestions() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [ans, setAns] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios({
        method: "POST",
        url: "/quiz",
        data: {
          question,
          option1,
          option2,
          option3,
          option4,
          ans,
          categoryId,
          userId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" className="input input-bordered w-full" placeholder="Question" onChange={(e) => setQuestion(e.target.value)} />
        <input type="text" className="input input-bordered w-full" placeholder="Option 1" onChange={(e) => setOption1(e.target.value)} />
        <input type="text" className="input input-bordered w-full" placeholder="Option 2" onChange={(e) => setOption2(e.target.value)} />
        <input type="text" className="input input-bordered w-full" placeholder="Option 3" onChange={(e) => setOption3(e.target.value)} />
        <input type="text" className="input input-bordered w-full" placeholder="Option 4" onChange={(e) => setOption4(e.target.value)} />
        <input type="number" className="input input-bordered w-full" placeholder="Answer (1-4)" onChange={(e) => setAns(e.target.value)} />
        <select className="select select-bordered w-full" onChange={(e) => setCategoryId(e.target.value)}>
          <option disabled selected>Category Id (1 = Fact, 2 = Jokes)</option>
          <option value="1">1 - Fact</option>
          <option value="2">2 - Jokes</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
    </>
  );
}
