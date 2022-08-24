import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home'
import SignIn from './page/SignIn'
import Setting from './page/Setting'
import NewArticle from './page/NewArticle';
import SignUp from './page/SignUp';
import Article from './page/Article'
import MyProfile from './page/MyProfile';
import YourFeed from './page/YourFeed';
import GlobalFeed from './page/GlobalFeed';
import Tag from './page/Tag';


function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true' ? true : false)
  let data = JSON.parse(localStorage.getItem('user_login')) || ''
  const [name, setName] = useState(data ? data.user.username : '')

  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<Header isLogin={isLogin} data={data} name={name} />}>
          <Route path='/' element={<Home isLogin={isLogin} />} />
          <Route path='/settings' element={<Setting setIsLogin={setIsLogin} data={data} setName={setName} />} />
          <Route path='/sign-in' element={<SignIn setIsLogin={setIsLogin} setName={setName} />} />
          <Route path='/sign-up' element={<SignUp setIsLogin={setIsLogin} setName={setName} />} />
          <Route path='/newArticle/:slug' element={<NewArticle data={data} />} />
          <Route path='/newArticle/' element={<NewArticle data={data} />} />
          <Route path='/:username' element={<MyProfile data={data} />} />
          <Route path='/article/:slug' element={<Article data={data} />} />
        </Route>
      </Routes>
      


      {/* <Footer /> */}
    </div>
  );
}

export default App;
