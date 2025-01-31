import { Link } from "react-router"
import axios from "../AXIOS/axiosinstance"

export default function SettingsContainer({ question, AllQuestions }) {
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            await axios({
                method: "DELETE",
                url: `/quiz/${question.id}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            AllQuestions()
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message,
            })
        }
    }

    return (
        <div className="container w-[450px] h-[450px] bg-white border rounded-lg shadow-md p-4" style={{margin:"25px"}}>
            <p className="text-lg font-bold">
                Pertanyaan Nomor {question.id}
            </p>
            <div className="flex gap-2 mt-4">
                <Link 
                    to={`/edit/${question.id}`}
                    className="px-4 py-2 text-black bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors"
                >
                    Edit
                </Link>
                <button 
                    onClick={handleDelete}
                    className="px-4 py-2 text-white bg-red-300 rounded-md hover:bg-red-400 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}