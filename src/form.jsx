import { useStudy } from "./context/studyContext"


const Form = () => {

    const { question, answer, handleForm, changeQuestion, changeAnswer} = useStudy()
     
    return(
      <form className="" 
           onSubmit={handleForm}>
           
        <input type="text" placeholder="write your question here ..." value={question} onChange={changeQuestion}/>
        <input type="text" placeholder="write your answer here..." value={answer} onChange={changeAnswer}/>
        <button
            className="btn-add">Add</button>
      </form>
    )
  }
  export default Form;