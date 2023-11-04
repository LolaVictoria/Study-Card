import { useState } from "react";
import Form from "./form";
import Cards from "./card";
import Heading from "./heading";



// const questions = [
//   {
//     id: 3457,
//     question: "What language is React based on?",
//     answer: "JavaScript"
//   },
//   {
//     id: 7336,
//     question: "What are the building blocks of React apps?",
//     answer: "Components"
//   },
//   {
  //   id: 8832,
  //   question: "What's the name of the syntax we use to describe a UI in React?",
  //   answer: "JSX"
  // },
  // {
  //   id: 1297,
  //   question: "How to pass data from parent to child components?",
  //   answer: "Props"
  // },
  // {
  //   id: 9103,
//     question: "How to give components memory?",
//     answer: "useState hook"
//   },
//   {
//     id: 2002,
//     question:
//       "What do we call an input element that is completely synchr
const Flashcard = () => {
   const [cards, setCards] = useState([])

   const handleUpdate = (card) =>{
     setCards(cards=>[...cards, card])
   }

   const handleDelete = (id) => {
      setCards((cards) => cards.filter((card) => card.id !== id))
   }
   
  return (
      <div className="mx-10">
        <Heading/>
          <Form updateCards={handleUpdate} />
          <Cards cardData={cards} updateDelete={handleDelete}/>
      </div>
  )
}


export default  Flashcard;