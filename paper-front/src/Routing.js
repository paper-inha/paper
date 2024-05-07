import App from './Component/App';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Join from './Pages/Join';
import Title from './Pages/Title';
import User from './Pages/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginContextProvider from './Contexts/LoginContextProvider';

function Routing(){
    return (
            <BrowserRouter>
            <LoginContextProvider>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/home' element={<App />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/join' element={<Join />}/>
                    <Route path='/title' element={<Title />}/>
                    <Route path='/user' element={<User />}/>
                </Routes>
            </LoginContextProvider>
            </BrowserRouter>
    )
}
export default Routing;