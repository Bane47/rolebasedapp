import './App.css';
import MyForm from './Components/Pages/SignUp';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Pages/Login';
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import AdminPage from './Components/AdminPage/AdminPage';

function App() {
  const { user } = authState;
  const isAdmin = user && user.type === 'admin';
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
{isAdmin ? (
<AdminPage/>
):(
  <button onClick={handleLogin}>Login as Admin</button>

)}
        </AuthProvider>
       
        <Routes>
          <Route path='/myform' element={<MyForm  />} />
          <Route path='/login' element={<Login  />} />
          <Route path={'/secure'} element={
          <RequireAuth loginPath={'/login'}>
            <SecureComponent/>
          </RequireAuth>
        }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
