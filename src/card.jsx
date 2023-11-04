import { useState } from "react"

const Cards = ({cardData, updateDelete}) => {


    const [selectedId, setSelectedId] = useState(" ")
                                            
    const handleClick = (id) => {
        setSelectedId(id !== selectedId ? id : "")
    }

    return(
        <div className="flashcards">
             {cardData.map(ques => (
               <div key={ques.id}         
                   onClick={() => handleClick(ques.id)}
                   className={ques.id === selectedId ? "selected" : " "}>
                    
                      <h3 className="card-heading">{ques.id === selectedId ? "ANSWER" : "QUESTION"}</h3>
                      <p className="card-content">{ques.id === selectedId ? ques.answer : ques.question}</p>
                    
                <button 
                   onClick={() => updateDelete(ques.id)}
                   className="btn-delete">X</button>
              </div>
             ))}
        </div>
    )
} 
export default Cards; 