import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from '../AXIOS/axiosinstance'
import Swal from "sweetalert2"
export default function EditQuestions() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [ans, setAns] = useState('')
    const [categoryId, setCategoryId] = useState('')

        async function handleSubmit(e) {
        e.preventDefault()
            
        try {

            const { data } = await axios({
                method: "PUT",
                url: "/quiz/" + id,
                data: {
                    question, option1, option2, option3, option4, ans, categoryId
                }, headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            })
        }
    }

    return <>

        <div>
            <form onSubmit={handleSubmit} style={{margin:"20px"}}>
                <div>
                    <label className="input input-bordered flex items-center gap-2">

                        <input type="text" className="grow" placeholder="Question" onChange={e => setQuestion(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">

                        <input type="text" className="grow" placeholder="Option1" onChange={e => setOption1(e.target.value)} />
                    </label>
                    <div>
                        <label className="input input-bordered flex items-center gap-2">

                            <input type="text" className="grow" placeholder="Option2" onChange={e => setOption2(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label className="input input-bordered flex items-center gap-2">

                            <input type="text" className="grow" placeholder="Option3" onChange={e => setOption3(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label className="input input-bordered flex items-center gap-2">

                            <input type="text" className="grow" placeholder="Option4" onChange={e => setOption4(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label className="input input-bordered flex items-center gap-2">

                            <input type="number" className="grow" placeholder="Answer" onChange={e => setAns(e.target.value)} />
                        </label>
                    </div>
                    <div>
                    <select className="select w-full max-w-xs" onChange={e=> setCategoryId(e.target.value)}>
                    <option disabled selected>Category Id (1 is fact , 2 is jokes)</option>
                    <option>1</option>
                    <option>2</option>
                    </select>
                    </div>
                </div>
                <input type="submit" value="Submit" className="btn" />
            </form>
        </div>
    </>
}