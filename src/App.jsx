import './App.css';
import Content from './Components/Content';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Routes, Route} from "react-router-dom";

function App() {
 return (
  <div>
    <Routes>
    <Route exact path='/signup' element={<SignUp/>}/>
    <Route exact path='/' element={<Login/>}/>
    <Route exact path='/content' element={<Content/>}/>
    </Routes>
  </div>
  );
}

export default App;
