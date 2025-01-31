import { useEffect, useState } from "react";
import axios from "../AXIOS/axiosinstance";
import SettingsContainer from "../components/ContainerSettings";
import Swal from "sweetalert2";

export default function Settings() {
  const [questions, setQuestions] = useState([]);
  async function AllQuestions() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/quiz",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setQuestions(data);
      console.log(data, "SSSSSSSSSSS");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }
  useEffect(() => {
    AllQuestions();
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center",marginTop:"5px" }}> Here To edit the questions</h1>
      <div className="grid grid-cols-3">
        {questions.map((el) => {
          return (
            <SettingsContainer
              key={el.id}
              question={el}
              AllQuestions={AllQuestions}
            />
          );
        })}
      </div>
    </>
  );
}
