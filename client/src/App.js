import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home.jsx'
import VideogameCreate from './components/VideogameCreate/VideogameCreate.jsx'
import VideogameDetail from './components/VideogameDetail/VideogameDetail.jsx'


function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={LandingPage} />
      {/* <Route path='/' component={NavBar} /> */}
      <Route  path='/Home' component={Home} />
      <Route  path='/CreateVideogame' component={VideogameCreate} />
      <Route  path='/VideogameDetail/:id' component={VideogameDetail} />
    </React.Fragment>
  );
}

export default App;
