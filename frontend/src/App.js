import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home';
import NewTask from './components/NewTask';
import AllTasks from './components/AllTasks';
import NavbarComp from './components/NavbarComp';
import Monday from './components/days/Monday';
import Tuesday from './components/days/Tuesday';
import Wednesday from './components/days/Wednesday';
import Thursday from './components/days/Thursday';
import Friday from './components/days/Friday';
import Saturday from './components/days/Saturday';
import Sunday from './components/days/Sunday.';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Router>
      <NavbarComp/>
    <div className = "container">
      <Routes>
        <Route path = "/" element={<Home/>}></Route>
        <Route path = "/newtask" element={<NewTask/>}></Route>
        <Route path = "/alltasks" element={<AllTasks/>}></Route>
        <Route path = "/monday" element={<Monday/>}></Route>
        <Route path = "/tuesday" element={<Tuesday/>}></Route>
        <Route path = "/wednesday" element={<Wednesday/>}></Route>
        <Route path = "/thursday" element={<Thursday/>}></Route>
        <Route path = "/friday" element={<Friday/>}></Route>
        <Route path = "/saturday" element={<Saturday/>}></Route>
        <Route path = "/sunday" element={<Sunday/>}></Route>
        <Route path = "/login" element={<LoginForm/>}></Route>
        <Route path = "/register" element={<RegisterForm/>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
