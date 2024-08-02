import { Routes, Route, } from 'react-router-dom';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Home } from './components/home';
import { Main } from './components/main';
import { Editpost } from './components/editpost';
import { Display_prod } from './components/display_prod';
import { Buy_product } from './components/buy';
import { Mainopt } from './components/mainopt';
import { Search } from './components/search';
import { Edit } from './components/edit';
import { Orders } from './components/Orders';
import { Prodord } from './components/prodord';



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/main' element={<Main/>}></Route>
      <Route path='/mainoption' element={<Mainopt/>}></Route>
      <Route path='/register' element={<Signup />}></Route>
      <Route path='/post' element={<Editpost />}></Route>
      <Route path='/dis' element={<Display_prod />}></Route>
      <Route path='/buy' element={<Buy_product/>}></Route>
      <Route path='/display' element={<Search />}></Route>
      <Route path='/edit' element={<Edit />}></Route>
      <Route path='/orders' element={<Orders />}></Route>
      <Route path='/ord' element={<Prodord />}></Route>
    </Routes>
    </>
  );
}

export default App;
