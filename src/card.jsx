import { useState } from "react"
import { useStudy } from "./context/studyContext"
import {FaTrashAlt} from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

const Cards = () => {
    const navigate = useNavigate()
    const { cards, handleDelete} = useStudy()

    const [selectedId, setSelectedId] = useState(" ")
                                            
    const handleClick = (id) => {
        setSelectedId(id !== selectedId ? id : "")
    }

    return(
        <div>
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
             <div className="">
             <p 
              className="absolute bottom-0 left-[40%] font-semibold underline text-lg text-black flex my-5"
              onClick={(e) => {
                e.preventDefault()
                navigate(-1)}}>
                    <FaArrowLeftLong size={25}/>
                  <span className="ml-3">Home</span>
                </p>
             </div>
        </div>
    )
} 
export default Cards; 