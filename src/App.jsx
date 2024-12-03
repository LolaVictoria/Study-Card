import './flashcard.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Flashcard from './flashcard';
import StartPage from "./pages/startpage"
import { StudyProvider } from './context/studyContext';
import Login from './pages/login';
import SignUp from './pages/signUp';
import { AuthProvider } from './context/authContext';
import VerifyEmail from './pages/verifyEmail';

const App = () => {
  return (
    <AuthProvider>

    <StudyProvider>
    <BrowserRouter>
       <Routes>
        <Route path="" element={<StartPage/>} />
        <Route  path="/lets-study" element={<Flashcard />}/>
        <Route  path="/login" element={<Login />}/>
        <Route  path="/signup" element={<SignUp />}/>
        <Route  path="/verifyemail" element={<VerifyEmail />}/>
       </Routes>
    </BrowserRouter>
    </StudyProvider>
    </AuthProvider>
  );
}
 
export default App;