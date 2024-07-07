import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Home.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClientList from './ClientList';
import ClientEdit from "./ClientEdit";
import AppNavbar from './AppNavbar';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="d-grid container gap-3">
                <AppNavbar/>
                <Routes>
                    <Route path='/' exact={true} element={<Home />}/>
                    <Route path='/team' exact={true} element={<ClientList/>}/>
                    <Route path='/team/:id' element={<ClientEdit />}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
  }
}

export default App;