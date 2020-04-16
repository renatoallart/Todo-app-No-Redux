import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import '../template/custom.css'


import React from 'react'
import Menu from '../template/menu'
import Routes from '../main/routes'

export default props =>
    <div className="conteiner">
        <Menu/>
        <Routes/>
    </div>