import { useNavigate } from "react-router-dom"
import { useStudy } from "./context/studyContext"
import {FaArrowLeftLong} from "react-icons/fa6"

const Form = () => {

    const { question, answer, handleForm, changeQuestion, changeAnswer} = useStudy()
     const navigate = useNavigate()
    return(
      <form className="" 
           onSubmit={handleForm}>
            <p 
              className="px-3 font-bols text-lg text-black"
              onClick={(e) => {
                e.preventDefault()
                navigate(-1)}}>
                  <FaArrowLeftLong size={25}/>
                </p>
        <input type="text" placeholder="write your question here ..." value={question} onChange={changeQuestion}/>
        <input type="text" placeholder="write your answer here..." value={answer} onChange={changeAnswer}/>
        <button
            className="btn-add">Add</button>
      </form>
    )
  }
  export default Form;