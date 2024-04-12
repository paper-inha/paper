import App from './Component/App';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Join from './Pages/Join'
import Title from './Pages/Title'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Routing(){
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/home' element={<App />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/join' element={<Join />}/>
                    <Route path='/title' element={<Title />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Routing;