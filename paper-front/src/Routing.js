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
import {AuthProvider} from "./Context/AuthContext";
import PrivateRoute from './Component/Private/PrivateRoute';

function Routing(){
    return (
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/home' element={<App />}/>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/join' element={<Join />}/>
                        <Route element={<PrivateRoute />}>
                        <Route path='/title' element={<Title />}/>
                        </Route>
                        <Route element={<PrivateRoute />}>
                        <Route path='/write' element={<Write />}/>
                        </Route>
                        <Route path='/page' element={<Page/>}/>
                        <Route element={<PrivateRoute />}>
                        <Route path='/user' element={<User/>}/>
                        </Route>
                        <Route element={<PrivateRoute />}>
                        <Route path='/normaltitle' element={<NormalTitle/>}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
    )
}
export default Routing;