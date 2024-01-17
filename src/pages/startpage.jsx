import { Link } from "react-router-dom";
import { useStudy } from "../context/studyContext";

const StartPage = () => {
    const { questionLength } = useStudy()
    return (
        <div className="lg:text-center mx-8 lg:mx-36 my-5 overflow-hidden">
            <h1 className="text-2xl font-bolder mb-6 ">Study Card</h1>
            <div className="mb-6">
                <p>You have {questionLength} question and answers in your study card</p>
            </div>
            <p className="mb-6 font-semibold text-lg">
            A study card platform designed to elevate your learning experience. Whether you&apos;re a student looking to optimize your study routine or an educator seeking interactive teaching tools, this project aims to enhance the way we absorb and retain information.            </p>
            <Link to="/lets-study">

            <button 
               className="bg-[#2e5caf] text-[#ffff] p-3 rounded-lg"
               >
               Start Studying
            </button>
            </Link>
        </div>
    );
}
 
export default StartPage;