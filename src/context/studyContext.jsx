import { createContext, useContext, useState } from "react"

const studyContext = createContext()

const StudyProvider = ({children}) => {
  const [question, setQuestion] = useState([])
  const [answer, setAnswer] = useState([])
  const [cards, setCards] = useState([])
  
    const handleForm= (e) => { 
      e.preventDefault()
      if(!question || !answer) return
      const qANDa= {question, answer, id:Date.now()}
      handleUpdate(qANDa)
      setAnswer("")
      setQuestion("")
    }

    const handleUpdate = (card) =>{
      setCards(cards=>[...cards, card])
    }
    
    const handleDelete = (id) => {
      setCards((cards) => cards.filter((card) => card.id !== id))
   }
   
   const changeQuestion = (e) => {
    setQuestion(e.target.value)
   }
   
   const changeAnswer = (e) => {
    setAnswer(e.target.value)
  }
  const questionLength = question.length

     return (
        <studyContext.Provider
            value={{
                question,
                answer,
                cards,
                handleForm,
                handleDelete,
                changeQuestion,
                changeAnswer,
                questionLength
            }}>
            {children}
        </studyContext.Provider>
     )
}

const useStudy = () => {
    const context = useContext(studyContext)
    if(context === undefined) 
        throw new Error('studyContext was used outside the CitiesProvider')
    return context
}

export {StudyProvider, useStudy}