import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainpage from './Page/Mainpage';
import Book from './Page/Book';
import Repertoire from './Page/Repertoire';
import Header from './Component/Header';
import useFetch from './util/useFetch';
import { useState } from 'react';

function App() {
  const [data, setData, error] = useFetch("http://localhost:3001/books");
  const [data2, setData2, error2] = useFetch("http://localhost:3001/repertoire");
  const [imageOnBook, setImageOnBook] = useState(false)
  const [imageOnRep, setImageOnRep] = useState(false)

  const clickHandler = () => {
    setImageOnBook(!imageOnBook)
  }

  const clickHandler2 = () => {
    setImageOnRep(!imageOnRep)
  }

  return (
  <BrowserRouter>
      <div className='main'>
        <div className='container'>
          <Header 
          imageOnBook={imageOnBook} 
          setImageOnBook={setImageOnBook} 
          clickHandler={clickHandler} 
          imageOnRep={imageOnRep} 
          setImageOnRep = {setImageOnRep}
          clickHandler2={clickHandler2}
          />
          <Mainpage />
          <Routes>
            <Route path='/' element=<Mainpage clickHandler={clickHandler} clickHandler2={clickHandler2}/>/>
            <Route path='/book' element=<Book data={data} setData={setData}/>/>
            <Route path='/repertoire' element=<Repertoire data2={data2} setData2={setData2}/>/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
