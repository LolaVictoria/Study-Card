import './flashcard.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Flashcard from './flashcard';
import StartPage from "./pages/startpage"
import { StudyProvider } from './context/studyContext';

const App = () => {
  return (
    <StudyProvider>
    <BrowserRouter>
       <Routes>
        <Route path="" element={<StartPage/>} />
          <Route  path="/lets-study" element={<Flashcard />}/>
       </Routes>
    </BrowserRouter>
    </StudyProvider>
  );
}
 
export default App;