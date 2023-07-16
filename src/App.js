import './App.css';
import MyForm from './Components/Pages/SignUp';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Pages/Login';
import AdminPage from './Components/AdminPage/AdminPage';
import { CustomContext, CustomProvider } from './Components/Context/Context';
import { useContext } from 'react';

function App() {
  const userType = useContext(CustomContext)
  console.log("Is vsdf "+userType)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <CustomProvider >
          <Routes>
            <Route path='/Home' element={<AdminPage />} />
            <Route path='/myform' element={<MyForm />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          
             </CustomProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
