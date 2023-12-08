import { Link } from "react-router-dom";
import { useStudy } from "../context/studyContext";

const StartPage = () => {
    const { questionLength } = useStudy()
    return (
        <div className="text-center mx-36 my-48">
            <h1 className="text-2xl font-bolder mb-6 ">Study Card</h1>
            <div className="mb-6">
                <p>You have {questionLength} question and answers in your study card</p>
            </div>
            <p className="mb-6 font-semibold text-lg">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga nesciunt reiciendis sed perspiciatis voluptates veniam eos necessitatibus autem blanditiis molestias dolorum, iste numquam cumque architecto sequi iusto ea aut, nam unde? Ipsum ut quibusdam natus numquam?
            </p>
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