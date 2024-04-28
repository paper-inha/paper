import React from 'react'
import Menubar from '../Component/Menubar/Header'
import LoginContextConsumer from '../Contexts/LoginContextConsumer'

const View = () => {
    return (
        <>
        <Menubar />
        <div className="container">
            <h1>View</h1>
            <hr />
            <h2>소개 페이지</h2>
            <LoginContextConsumer/>
        </div>
        </>
    )
}
export default View