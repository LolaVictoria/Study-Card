import { useState } from "react"

const Form = ({updateCards}) => {

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
  
  
    const handleForm= (e) => {
  
      e.preventDefault()
      if(!question || !answer) return
      const qANDa= {question, answer, id:Date.now()}
      updateCards(qANDa)
      setAnswer("")
      setQuestion("")
    }
    return(
      <form className="" 
           onSubmit={handleForm}>
        <input type="text" placeholder="write your question here ..." value={question} onChange={e => setQuestion(e.target.value)}/>
        <input type="text" placeholder="write your answer here..." value={answer} onChange={e => setAnswer(e.target.value)}/>
        <button
            className="btn-add">Add</button>
      </form>
    )
  }
  export default Form;