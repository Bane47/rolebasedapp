import React from 'react';
import './App.css';
import MyForm from './Components/Pages/SignUp';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Pages/Login';
import AdminPage from './Components/AdminPage/AdminPage';
import { TypeProvider } from './Components/Context/Context';
import { MissionProvider } from './Components/Context/MissionProvider';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App background">
      <BrowserRouter>
        <Navbar />
        <TypeProvider>
          <MissionProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Tasks' element={<AdminPage />} />
              <Route path='/myform' element={<MyForm />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </MissionProvider>
        </TypeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
