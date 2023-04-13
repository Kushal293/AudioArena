import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/shared/Navigation/Navigation';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Room from './pages/Room/Room';

// const auth = false;
// const user = {
//   activated: false
// };

function App () {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message='Loading, please wait...' />
  ): (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={ <Login /> }></Route>
        
        <Route element={ <GuestRoutes /> }>
          <Route path = '/' element = { <Home /> }></Route>
          <Route path = '/authenticate' element = {<Authenticate />} ></Route>
        </Route>
        <Route element={ <SemiProtectedRoutes /> }>
          <Route path='/activate' element= {<Activate />}></Route>
        </Route>
        <Route element={ <ProtectedRoutes /> }>
          <Route path='/rooms' element={<Rooms />}></Route>
        </Route>
        <Route element={ <ProtectedRoutes /> }>
          <Route path='/room/:id' element={<Room />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const GuestRoutes = () => {
  const { isAuth } = useSelector(state => state.auth);
  const location = useLocation();
  return isAuth ? <Navigate to='/rooms' state={{ from: location}} replace /> : <Outlet /> 
}

const SemiProtectedRoutes = () => {
    const { isAuth, user } = useSelector(state => state.auth);
  const location = useLocation();
  return !isAuth ? <Navigate to='/' state={{ from : location }} replace /> : isAuth && !user.activated ? <Outlet /> : <Navigate to='/rooms' state={{ from: location}} replace /> 
}

const ProtectedRoutes = () => {
    const { isAuth, user } = useSelector(state => state.auth);
  const location = useLocation();
  return !isAuth ? <Navigate to='/' state={{ from: location}} replace /> : isAuth && !user.activated ? <Navigate to='/activate' state={{ from: location}} replace /> : <Outlet />
}

export default App;

