import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './Components/Routes/Private';
import ForgotPassword from './pages/auth/Forgot-password';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './Components/Routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      <Route path='admin/users' element={<Users/>}/>
      </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      
    

    </Routes>
    </>
  );
}

export default App;
