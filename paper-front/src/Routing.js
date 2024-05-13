import App from './Component/App';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Join from './Pages/Join'
import Title from './Pages/Title'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Write from "./Pages/Write";
import Page from "./Pages/Page";
import User from "./Pages/User";
import NormalTitle from "./Pages/NormalTitle";

function Routing(){
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/home' element={<App />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/join' element={<Join />}/>
                    <Route path='/title' element={<Title />}/>
                    <Route path='/write' element={<Write />}/>
                    <Route path='/page' element={<Page/>}/>
                    <Route path='/user' element={<User/>}/>
                    <Route path='/normaltitle' element={<NormalTitle/>}/>
                </Routes>
            </BrowserRouter>
    )
}
export default Routing;