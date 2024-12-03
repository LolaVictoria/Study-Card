import { Link } from "react-router-dom";
import { useStudy } from "../context/studyContext";

const StartPage = () => {
    const { questionLength } = useStudy()
    return (
        <div>
            <div className=" flex items-center justify-between py-2 px-8" >
                <h1 className="text-4xl font-bolder text-[#2e5caf]" >Study Card</h1>

                <div className="text-[#2e5caf] flex items-center">
                    <Link to="/login">                
                    <button className="border-2 border-[#2e5caf] rounded-full py-2 px-4 mr-4">Login</button>
                    </Link>

                    <Link to="/signup">                
                    <button className="border-2 border-[#2e5caf] rounded-full py-2 px-4">signup</button>
                    </Link>
                </div>

            </div>
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
        </div>
    );
}
 
export default StartPage;