import { useState } from "react"
import { useStudy } from "./context/studyContext"
import {FaTrashAlt} from "react-icons/fa"

const Cards = () => {
    const { cards, handleDelete} = useStudy()

    const [selectedId, setSelectedId] = useState(" ")
                                            
    const handleClick = (id) => {
        setSelectedId(id !== selectedId ? id : "")
    }

    return(
        <div className="flashcards">
             {cards.map(ques => (
               <div key={ques.id}         
                   onClick={() => handleClick(ques.id)}
                   className={ques.id === selectedId ? "selected" : " "}>
                    
                      <h3 className="card-heading">{ques.id === selectedId ? "ANSWER" : "QUESTION"}</h3>
                      <p className="card-content">{ques.id === selectedId ? ques.answer : ques.question}</p>
                    
               {ques.id !== selectedId ?  <button 
                   onClick={() => handleDelete(ques.id)}
                   className="btn-delete">
                      <FaTrashAlt size={25} />
                   </button> : ""}
              </div>
             ))}
        </div>
    )
} 
export default Cards; 