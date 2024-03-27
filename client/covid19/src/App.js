import logo from './logo.svg';
import './App.css';
import PeopleList from './Client';
import MyClient from './MyClient';
import Edit from './Edit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './Add';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='' element={ <MyClient/>}/>
      <Route path='/edit' element={<Edit/>}/>
      <Route path='/add' element={<Add/> }/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
